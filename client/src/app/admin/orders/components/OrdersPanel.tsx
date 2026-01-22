"use client";

import { useState } from "react";
import OrdersFilters from "./OrdersFilters";
import OrdersSummary from "./OrdersSummary";
import OrdersTable from "./OrdersTable";
import { adminOrdersSeed } from "./orders-data";

export default function OrdersPanel() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [channel, setChannel] = useState("all");

  return (
    <div className="space-y-6">
      <OrdersSummary />
      <OrdersFilters
        items={adminOrdersSeed}
        query={query}
        status={status}
        type={type}
        channel={channel}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onTypeChange={setType}
        onChannelChange={setChannel}
      />
      <OrdersTable
        items={adminOrdersSeed}
        query={query}
        status={status}
        type={type}
        channel={channel}
      />
    </div>
  );
}
