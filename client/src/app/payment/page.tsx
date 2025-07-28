"use client";

import { useCartStore } from "../../store/cartStore";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaStore } from "react-icons/fa";

export default function PaymentPage() {
  const { cart, clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderType, setOrderType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);
  const [manualPincode, setManualPincode] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const subtotal = parseFloat(searchParams.get("subtotal") || "0");
  const tax = parseFloat(searchParams.get("tax") || "0");
  const discount = parseFloat(searchParams.get("discount") || "0");
  const deliveryCharge = orderType === "delivery" ? deliveryFee : 0;
  const total = subtotal + tax - discount + deliveryCharge;

  const bakeryLocation = {
    lat: 28.5702,
    lng: 77.3268,
  };

  // Fetch user's location and calculate delivery distance
  useEffect(() => {
    if (orderType === "delivery") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const dist = await getDistance(userLat, userLng);
            calculateDeliveryCharge(dist);
          },
          () => {
            setLocationDenied(true);
          }
        );
      } else {
        setLocationDenied(true);
      }
    }
  }, [orderType]);

  const getDistance = async (lat: number, lng: number) => {
    const apiKey = "YOUR_GOOGLE_API_KEY"; // 🔐 Replace with actual key

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${bakeryLocation.lat},${bakeryLocation.lng}&key=${apiKey}`
      );

      const data = await response.json();
      const distanceText =
        data?.rows?.[0]?.elements?.[0]?.distance?.text || "0";
      const distance = parseFloat(distanceText.replace(" km", "").trim());
      return distance;
    } catch (err) {
      console.error("Error calculating distance:", err);
      return 0;
    }
  };

  const calculateDeliveryCharge = (distance: number) => {
    setDeliveryDistance(distance);
    if (distance <= 2) {
      setDeliveryFee(0);
    } else {
      const charge = Math.ceil(distance - 2) * 10;
      setDeliveryFee(charge);
    }
  };

  useEffect(() => {
    if (cart.length === 0) router.push("/cart");
  }, [cart, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    cardNumber: false,
    expiry: false,
    cvv: false,
    cardName: false,
    orderType: false,
  });

  const handleOrder = () => {
    const newErrors = {
      firstName: !form.firstName.trim(),
      lastName: !form.lastName.trim(),
      email: !form.email.trim(),
      phone: !form.phone.trim(),
      orderType: !orderType,
      cardNumber: paymentMethod === "card" ? !form.cardNumber.trim() : false,
      expiry: paymentMethod === "card" ? !form.expiry.trim() : false,
      cvv: paymentMethod === "card" ? !form.cvv.trim() : false,
      cardName: paymentMethod === "card" ? !form.cardName.trim() : false,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const query = new URLSearchParams({
      orderType,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
    }).toString();

    router.push(`/confirmation?${query}`);
  };

  return (
    <section className="min-h-screen bg-[#f3f2ec] px-4 pt-32 pb-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left Form Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Order Type */}
          <div
            className={`bg-white p-6 rounded-2xl border ${
              errors.orderType ? "border-red-500" : "border-[#2a2927]"
            } shadow-sm`}
          >
            <h2 className="text-xl font-bold text-[#2a2927] mb-4 flex items-center gap-2">
              <FaStore className="text-[#2a2927]" /> Order Type
            </h2>

            <div className="space-y-3">
              {/* Pickup Option */}
              <label
                className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer ${
                  orderType === "pickup"
                    ? "border-[#7f6df2] bg-[#f8f7ff]"
                    : "border-[#ddd]"
                }`}
              >
                <div className="flex items-center gap-3 text-[#2a2927]">
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === "pickup"}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">Outlet Pickup</p>
                    <p className="text-xs text-gray-500">
                      Ready in 15–30 minutes
                    </p>
                  </div>
                </div>
              </label>

              {/* Delivery Option */}
              <label
                className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer ${
                  orderType === "delivery"
                    ? "border-[#7f6df2] bg-[#f8f7ff]"
                    : "border-[#ddd]"
                }`}
              >
                <div className="flex items-center gap-3 text-[#2a2927]">
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === "delivery"}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                  <div>
                    <p className="font-medium">
                      Delivery{" "}
                      <span className="text-sm text-[#7f6df2]">
                        (₹10/km after 2 km)
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Delivery in 45–60 minutes
                    </p>
                  </div>
                </div>
              </label>

              {/* Delivery distance */}
              {orderType === "delivery" && deliveryDistance > 0 && (
                <p className="text-xs text-gray-500">
                  📍 Estimated distance: {deliveryDistance.toFixed(2)} km
                </p>
              )}

              {/* Pincode fallback */}
              {locationDenied && orderType === "delivery" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter your pincode"
                    value={manualPincode}
                    onChange={(e) => setManualPincode(e.target.value)}
                    className="border border-[#2a2927] p-2 rounded w-full text-[#2a2927]"
                  />
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ Location denied. Estimate using your pincode.
                  </p>
                </div>
              )}

              {/* Order type error message */}
              {errors.orderType && (
                <p className="text-xs text-red-600 mt-2">
                  Please select an order type
                </p>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-2xl border border-[#2a2927] shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#2a2927]">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.firstName ? "border-red-500" : "border-[#2a2927]"
                  } p-3 rounded-md bg-transparent text-[#2a2927]`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600 mt-1">
                    First name is required
                  </p>
                )}
              </div>

              <div>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.lastName ? "border-red-500" : "border-[#2a2927]"
                  } p-3 rounded-md bg-transparent text-[#2a2927]`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600 mt-1">
                    Last name is required
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-[#2a2927]"
                } p-3 rounded-md bg-transparent text-[#2a2927]`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">Email is required</p>
              )}
            </div>

            <div>
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.phone ? "border-red-500" : "border-[#2a2927]"
                } p-3 rounded-md bg-transparent text-[#2a2927]`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">
                  Phone number is required
                </p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-[#2a2927] shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#2a2927]">
              Payment Information
            </h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-[#2a2927]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>
              <label className="flex items-center gap-2 text-[#2a2927]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-3">
                <div>
                  <input
                    name="cardNumber"
                    placeholder="Card Number"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.cardNumber ? "border-red-500" : "border-[#2a2927]"
                    } p-3 rounded-md bg-transparent text-[#2a2927]`}
                  />
                  {errors.cardNumber && (
                    <p className="text-xs text-red-600 mt-1">
                      Card number is required
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <input
                      name="expiry"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.expiry ? "border-red-500" : "border-[#2a2927]"
                      } p-3 rounded-md bg-transparent text-[#2a2927]`}
                    />
                    {errors.expiry && (
                      <p className="text-xs text-red-600 mt-1">
                        Expiry date is required
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      name="cvv"
                      placeholder="CVV"
                      value={form.cvv}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.cvv ? "border-red-500" : "border-[#2a2927]"
                      } p-3 rounded-md bg-transparent text-[#2a2927]`}
                    />
                    {errors.cvv && (
                      <p className="text-xs text-red-600 mt-1">
                        CVV is required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    name="cardName"
                    placeholder="Name on Card"
                    value={form.cardName}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.cardName ? "border-red-500" : "border-[#2a2927]"
                    } p-3 rounded-md bg-transparent text-[#2a2927]`}
                  />
                  {errors.cardName && (
                    <p className="text-xs text-red-600 mt-1">
                      Card name is required
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Special Instructions */}
          <div className="bg-white p-6 rounded-2xl border border-[#2a2927] shadow-sm">
            <h2 className="text-xl font-bold text-[#2a2927] mb-2">
              Special Instructions
            </h2>
            <textarea
              rows={4}
              placeholder="Any special requests or delivery instructions..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full border border-[#2a2927] p-3 rounded-md bg-transparent text-[#2a2927]"
            />
          </div>
        </div>

        {/* Right Order Summary */}
        <div className="bg-white p-6 rounded-2xl border border-[#2a2927] shadow-sm h-fit">
          <h2 className="text-xl font-bold text-[#2a2927] mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-[#2a2927] text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%):</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            {orderType === "delivery" && (
              <div className="flex justify-between text-[#7f6df2]">
                <span>Delivery Charge:</span>
                <span>₹{deliveryCharge.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-3">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="bg-[#fdf7d8] text-[#6d5c00] text-xs p-3 rounded-md mt-3">
              ⏱️ Ready in 15–30 minutes
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="w-full mt-6 bg-[#2a2927] text-white py-3 rounded-full hover:bg-white hover:text-[#2a2927] hover:border hover:border-[#2a2927] transition-all"
          >
            Place Order – ₹{total.toFixed(2)}
          </button>
        </div>
      </div>
    </section>
  );
}
