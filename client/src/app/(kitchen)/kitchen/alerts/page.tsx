"use client";

import KitchenHeader from "@/components/kitchen/KitchenHeader";
import StockAlertForm from "@/components/kitchen/StockAlertForm";
import AlertsTable from "@/components/kitchen/AlertsTable";
import { useKitchenStore } from "@/store/kitchenStore";
import toast from "react-hot-toast";

export default function AlertsPage() {
  const {
    orders,
    stockAlerts,
    createStockAlert,
    acknowledgeAlert,
    resolveAlert,
    setAlertActionType,
  } = useKitchenStore();

  return (
    <div>
      <KitchenHeader
        title="Inventory Alerts"
        subtitle="Low Stock"
        description="Report low stock and coordinate with admin on replenishment."
        isLive
      />

      <div className="w-full py-6 space-y-6">
        <StockAlertForm
          orders={orders}
          onSubmit={(payload) => {
            createStockAlert(payload);
            toast.success("Stock alert created");
          }}
        />

        <AlertsTable
          alerts={stockAlerts}
          onAcknowledge={(id) => {
            acknowledgeAlert(id);
            toast.success("Alert acknowledged");
          }}
          onResolve={(id) => {
            resolveAlert(id);
            toast.success("Alert resolved");
          }}
          onActionType={(id, actionType) => {
            setAlertActionType(id, actionType);
            toast.success(`Action set to ${actionType}`);
          }}
        />
      </div>
    </div>
  );
}
