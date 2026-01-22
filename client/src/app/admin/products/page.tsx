import AdminSectionShell from "../components/AdminSectionShell";

export default function AdminProductsPage() {
  return (
    <AdminSectionShell
      title="Products"
      subtitle="Admin / Products"
      description="Catalog management, pricing, and visibility controls for all products."
      items={[
        { title: "Catalog", detail: "Create, edit, and archive products." },
        { title: "Pricing", detail: "Tiered pricing, discounts, and bundles." },
        { title: "Availability", detail: "Active status and channel visibility." },
      ]}
      primaryAction={{ label: "Add Product", href: "/admin/products" }}
      secondaryAction={{ label: "Export", href: "/admin/products" }}
    />
  );
}
