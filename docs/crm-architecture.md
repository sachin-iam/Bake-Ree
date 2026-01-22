# CRM Architecture

## CRM Navigation Render

```mermaid
flowchart TD
  A[Primary Sidebar: CRM] --> B[activeModule='crm']
  B --> C[SubSidebar sections=CRM_SUBNAV]
  C --> D[Only CRM items rendered]
  D --> E[Route /ops/crm/...]
```

## Customer 360 Data Flow

```mermaid
flowchart TD
  A[Customer ID] --> B[Fetch Customer]
  B --> C[Fetch Orders Summary]
  B --> D[Fetch Loyalty Ledger + Tier]
  B --> E[Fetch Wallet/Outstanding]
  B --> F[Fetch Wishlist]
  C --> G[Compute RFM/Lifecycle]
  G --> H[Compute CLV/Churn Score]
  H --> I[Recommendations (rules now, AI later)]
  I --> J[Persist CustomerInsight]
```

## Loyalty Tier + Streak

```mermaid
flowchart TD
  A[Order Completed] --> B[Earn Points + Update Streak]
  B --> C[Update Loyalty Ledger]
  B --> D[Update Tier Progress]
  D --> E{Tier Upgrade?}
  E -->|Yes| F[Apply Tier Benefits + Notify]
  E -->|No| G[Keep Tier]
  B --> H[Check Expiry Schedule]
```
