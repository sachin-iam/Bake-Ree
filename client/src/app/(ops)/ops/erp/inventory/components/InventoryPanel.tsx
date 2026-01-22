"use client";

import { useState } from "react";
import InventoryFilters from "./InventoryFilters";
import InventorySummary from "./InventorySummary";
import InventoryTable from "./InventoryTable";
import { inventorySeed } from "./inventory-data";

export default function InventoryPanel() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [location, setLocation] = useState("all");

  return (
    <div className="space-y-6">
      <InventorySummary />
      <InventoryFilters
        items={inventorySeed}
        query={query}
        status={status}
        location={location}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onLocationChange={setLocation}
      />
      <InventoryTable
        items={inventorySeed}
        query={query}
        status={status}
        location={location}
      />
    </div>
  );
}
