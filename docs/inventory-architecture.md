# Inventory + Procurement Architecture

This document captures the inventory/procurement scope, routing, and system flows for the Ops ERP modules.

## Module Scoping (Sub-sidebar)
```mermaid
flowchart TD
  A[Route] --> B{startsWith /ops/inventory?}
  B -->|Yes| C[Render INVENTORY_SUBNAV only]
  B -->|No| D{startsWith /ops/procurement?}
  D -->|Yes| E[Render PROCUREMENT_SUBNAV only]
```

## Procure-to-Stock (3-way match)
```mermaid
flowchart TD
  A[Low Stock Alert] --> B[PR Created]
  B --> C[Approval]
  C --> D[PO Sent]
  D --> E[GRN Receiving + Batch/Expiry]
  E --> F[QC Pass]
  F --> G[Stock Ledger IN + StockBatch update]
  G --> H[Vendor Bill]
  H --> I[3-Way Match PO-GRN-Bill]
  I --> J[Vendor Payment]
```

## FEFO Reservation -> Consumption
```mermaid
flowchart TD
  A[Order/Work Order] --> B[FEFO Allocate Batches]
  B --> C[Create Reservations]
  C --> D[Kitchen/Dispatch consumes]
  D --> E[Ledger OUT + Reduce OnHand]
  E --> F[Update COGS + Variance]
```

## ERP Service Topology
```mermaid
flowchart LR
  UI[Ops UI<br/>Inventory & Procurement] --> API[API Gateway]

  API --> INV[Inventory Service]
  API --> PROC[Procurement Service]
  API --> PROD[Production/Kitchen Service]
  API --> FIN[Finance Service]
  API --> NOTIF[Notification Service]

  INV --> DB[(Inventory DB)]
  PROC --> DB
  PROD --> DB
  FIN --> DB

  INV --> LEDGER[Stock Ledger Engine]
  INV --> FEFO[FEFO Allocation Engine]
  INV --> ALERTS[Low Stock & Expiry Engine]

  PROC --> AP[Accounts Payable]
  FIN --> GL[General Ledger / P&L]

  NOTIF --> SOCKETS[Realtime Alerts]
```

## Stock + Ledger Flow
```mermaid
flowchart TD
  Item[Item Master] --> Batch[Batch & Expiry]
  Batch --> Stock[Available Stock]

  Stock --> FEFO[FEFO Allocation]
  FEFO --> Reservation[Stock Reservation]

  Reservation --> Consumption[Consumption / Dispatch]
  Consumption --> Ledger[Stock Ledger Entry]

  Ledger --> Valuation[Inventory Valuation]
  Ledger --> COGS[COGS Calculation]
  Ledger --> Audit[Audit Trail]
```

## Low Stock to Payment
```mermaid
flowchart TD
  LowStock[Low Stock Trigger] --> PR[Purchase Request]
  PR --> Approval[Manager Approval]
  Approval --> PO[Purchase Order]

  PO --> Vendor[Vendor Delivery]
  Vendor --> GRN[GRN + Batch + Expiry]

  GRN --> QC[Quality Check]
  QC -->|Pass| StockIN[Ledger IN]
  QC -->|Fail| Hold[Quality Hold / Return]

  StockIN --> Bill[Vendor Bill]
  Bill --> Match[3-Way Match<br/>(PO-GRN-Bill)]
  Match --> Payment[Vendor Payment]
```

## FEFO Allocation Detail
```mermaid
flowchart TD
  Order[Order / Work Order] --> CheckStock[Check Available Stock]

  CheckStock --> FEFOEngine[FEFO Engine]
  FEFOEngine --> Batch1[Nearest Expiry Batch]
  FEFOEngine --> Batch2[Next Expiry Batch]

  Batch1 --> Reserve[Reserve Quantity]
  Batch2 --> Reserve

  Reserve --> Consume[Consume / Dispatch]
  Consume --> LedgerOUT[Ledger OUT]
```

## Production Consumption & Output
```mermaid
flowchart TD
  Recipe[BOM / Recipe] --> Plan[Production Plan]
  Plan --> IssueRaw[Issue Raw Materials]

  IssueRaw --> LedgerOUT[Ledger OUT<br/>Ingredients]
  LedgerOUT --> WIP[Work In Progress]

  WIP --> Output[Finished Goods]
  Output --> LedgerIN[Ledger IN<br/>Finished Batch]

  LedgerIN --> FGStock[Finished Goods Stock]
```

## Expiry Action Paths
```mermaid
flowchart TD
  Expiry[Batch Near Expiry] --> Alert[Expiry Alert]

  Alert --> Decision{Action}
  Decision -->|Use| FEFO
  Decision -->|Dispose| Waste[Waste Entry]
  Decision -->|Return| RTV[Return to Vendor]

  Waste --> LedgerWaste[Ledger WASTE]
  RTV --> LedgerRTV[Ledger RETURN]

  LedgerWaste --> WasteReport[Waste Cost Report]
```

## Transfers
```mermaid
flowchart TD
  SourceWH[Source Warehouse] --> TransferOut[Ledger TRANSFER OUT]

  TransferOut --> InTransit[In Transit]
  InTransit --> Receive[Receive at Destination]

  Receive --> TransferIn[Ledger TRANSFER IN]
  TransferIn --> DestWH[Destination Warehouse]
```

## Reorder Automation
```mermaid
flowchart TD
  StockLevel[Current Stock] --> Threshold[Reorder Point]

  Threshold -->|Below| Alert[Low Stock Alert]
  Alert --> Suggest[Reorder Suggestion]

  Suggest --> PR[Auto PR Draft]
  PR --> Approval
```

## Finance Posting Hooks
```mermaid
flowchart TD
  Ledger[Stock Ledger] --> Valuation[Inventory Valuation]

  Valuation --> BS[Balance Sheet<br/>Closing Stock]

  Ledger --> COGS[COGS]
  COGS --> PL[P&L Statement]

  Ledger --> Waste[Waste Expense]
  Waste --> PL
```
