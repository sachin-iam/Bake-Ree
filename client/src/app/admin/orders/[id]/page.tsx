"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import JsBarcode from "jsbarcode";

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Preparing: "bg-orange-100 text-orange-800",
  Ready: "bg-green-100 text-green-800",
  Delivered: "bg-blue-100 text-blue-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function OrderDetails() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab] = useState(initialTab);
  const [order, setOrder] = useState<any>(null);
  const [formattedDate, setFormattedDate] = useState("");
  const barcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched Order Data:", res.data); // Debug log
        setOrder(res.data);
        setFormattedDate(new Date(res.data.createdAt).toLocaleString());
      } catch (err) {
        toast.error("Failed to fetch order");
        console.error("Fetch failed:", err);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!order || !order._id || !barcodeRef.current) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const fixedCanvasWidth = 300;
    const canvasHeight = 80;
    const idLength = order._id.length;

    // Calculate bar width so barcode fits nicely inside fixed canvas
    const barWidth = fixedCanvasWidth / (idLength * 11); // tweak 11 for spacing
    const fontSize = 16; // fixed or dynamic as needed

    canvas.width = fixedCanvasWidth;
    canvas.height = canvasHeight;

    JsBarcode(canvas, order._id, {
      format: "CODE128",
      width: barWidth,
      height: 50,
      displayValue: true,
      fontSize: fontSize,
      textAlign: "center",
      lineColor: "#000",
      background: "#fff",
      textMargin: 5,
      margin: 0,
    });

    const dataUrl = canvas.toDataURL("image/png");

    const img = new Image();
    img.src = dataUrl;
    img.alt = `Order Barcode - ${order._id}`;
    img.style.maxWidth = "100%";
    img.style.height = "auto";

    barcodeRef.current.innerHTML = "";
    barcodeRef.current.appendChild(img);
  }, [order?._id]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        {!order ? (
          <div className="flex items-center justify-center text-lg text-gray-600 h-[60vh]">
            Loading...
          </div>
        ) : (
          <div className="print-area mt-10 bg-white shadow-lg rounded-2xl p-6 sm:p-10 relative border border-gray-300">
            {/* Header with logo and invoice number */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo.png"
                  alt="Bake Ree"
                  className="w-10 h-10"
                />
                <h2 className="text-xl font-bold text-purple-700">Bake Ree</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Invoice #: {order._id?.slice(0, 8)}
              </p>
            </div>

            {/* Invoice Title */}
            <h1 className="print-heading text-2xl font-bold text-purple-800 mb-6 text-center">
              Order Invoice
            </h1>

            {/* Action Buttons */}
            <div className="mb-6 flex justify-end gap-2 no-print">
              <button
                onClick={() => router.push("/admin?tab=orders")}
                className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                ⬅ Back to Orders
              </button>
              <button
                onClick={() => {
                  toast.success("Saving invoice... Check print dialog!", {
                    icon: "📄",
                    duration: 2000,
                  });
                  setTimeout(() => {
                    window.dispatchEvent(new Event("beforeprint"));
                    window.print();
                  }, 300);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium"
              >
                🖨️ Print Invoice
              </button>
            </div>

            {/* Info Section */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">
                  Customer Info
                </h2>
                <p className="text-gray-600">
                  <strong>Name:</strong> {order.user?.name || "Guest"}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {order.user?.email || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {order.user?.phone || "N/A"}
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Order Info</h2>
                <p className="text-gray-600">
                  <strong>Order Type:</strong> {order.orderType}
                </p>
                <p className="text-gray-600">
                  <strong>Placed At:</strong> {formattedDate}
                </p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Items Table */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 mb-2">Items</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-300">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-200 text-gray-700 font-medium">
                    <tr>
                      <th className="px-4 py-2">Item</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Rate</th>
                      <th className="px-4 py-2">Tax</th>
                      <th className="px-4 py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item: any, idx: number) => {
                      const quantity = item.quantity || 0;
                      const rate = item.price || 0;
                      const tax = 0;
                      const amount = quantity * rate + tax;
                      const prod = item.product || item.productId;

                      return (
                        <tr key={idx} className="border-t">
                          <td className="px-4 py-2 font-medium text-gray-800 flex items-center gap-2">
                            {prod?.image && (
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-8 h-8 rounded object-cover border"
                              />
                            )}
                            {prod?.name || "Unnamed Product"}
                          </td>

                          <td className="px-4 py-2 text-gray-800">
                            {quantity}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            ₹{rate.toFixed(2)}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            ₹{tax.toFixed(2)}
                          </td>
                          <td className="px-4 py-2 font-semibold text-gray-900">
                            ₹{amount.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <hr className="my-4" />

            {/* Special Instructions + Summary + Signature side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Special Instructions - left side */}
              {order.specialInstructions && (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Special Instructions
                  </h2>
                  <p className="italic text-gray-800 text-sm sm:text-base">
                    {order.specialInstructions}
                  </p>
                </div>
              )}

              {/* RIGHT SIDE: Summary with Signature BELOW it */}
              <div className="no-break flex flex-col items-end">
                {/* Summary */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: "auto minmax(60px, 1fr)",
                    rowGap: "6px",
                    columnGap: "12px",
                    maxWidth: "320px",
                    fontSize: "0.85rem",
                  }}
                >
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900 font-medium">
                    ₹{order.subtotal?.toFixed(2) || "0.00"}
                  </span>

                  <span className="text-gray-600">Discount:</span>
                  <span className="text-gray-900 font-medium">
                    ₹{order.discount?.toFixed(2) || "0.00"}
                  </span>

                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900 font-medium">
                    ₹{order.tax?.toFixed(2) || "0.00"}
                  </span>

                  {order.orderType === "Delivery" && (
                    <>
                      <span className="text-gray-600">Delivery Charge:</span>
                      <span className="text-gray-900 font-medium">₹49</span>
                    </>
                  )}

                  <div className="col-span-2 border-t border-gray-300 my-1" />

                  <span className="text-gray-800 font-semibold text-sm">
                    Total:
                  </span>
                  <span className="text-purple-800 font-bold text-sm">
                    ₹{order.total?.toFixed(2)}
                  </span>

                  <span className="text-gray-600">Paid:</span>
                  <span className="text-gray-900 font-medium">
                    ₹{order.total?.toFixed(2)}
                  </span>
                </div>

                {/* Signature - directly below summary */}
                <div className=" no-break mt-12 text-center flex flex-col justify-center items-center w-auto">
                  <p className="font-medium text-gray-700 mb-2">
                    Authorized Signature
                  </p>
                  <div className="h-16 border-b border-gray-400 w-48" />
                  <span
                    style={{
                      fontFamily: "'Brush Script MT', cursive",
                      fontStyle: "italic",
                      fontSize: "28px",
                      color: "#6b21a8",
                      display: "inline-block",
                      marginTop: "0.5rem",
                    }}
                  >
                    Bake Ree
                  </span>
                </div>
              </div>
            </div>

            {/* Barcode and Signature aligned in row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mt-[-20vmin]">
              {/* Barcode */}
              <div>
                <p className="font-medium text-gray-700 mb-2">Scan Barcode</p>
                <div
                  ref={barcodeRef}
                  className="barcode-wrapper"
                  style={{
                    marginTop: "0.5rem",
                    minHeight: "60px",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    maxWidth: "300px",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: 15, color: "#999" }}>
                    Barcode loading...
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-sm italic text-gray-600">
              Thank you for ordering with Bake Ree! <br />
              Terms & Conditions: Please retain this receipt for any queries.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
