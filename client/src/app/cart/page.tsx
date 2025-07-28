"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.05).toFixed(2);
  const discount =
    appliedDiscount > 0 ? +(subtotal * appliedDiscount).toFixed(2) : 0;
  const total = subtotal + tax - discount;

  const applyOrRemoveCoupon = () => {
    if (couponApplied) {
      // Remove coupon
      setAppliedDiscount(0);
      setPromoCode("");
      setCouponApplied(false);
    } else {
      // Apply coupon
      if (promoCode.toLowerCase() === "welcome10") {
        setAppliedDiscount(0.1);
        setCouponApplied(true);
      } else {
        alert("Invalid promo code");
      }
    }
  };

  const handleProceedToCheckout = () => {
    const params = new URLSearchParams({
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
      coupon: couponApplied ? promoCode : "",
    });
    router.push(`/payment?${params.toString()}`);
  };

  return (
    <section className="min-h-screen bg-[#f3f2ec] px-4 pt-36 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#2a2927] mb-6">
            Cart Items ({cart.length})
          </h2>
          {cart.length === 0 ? (
            <p className="text-[#2a2927] py-10 text-center">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e6e6e6] rounded-2xl p-4 flex items-center justify-between shadow-sm h-[100px]"
                >
                  <div className="flex items-center gap-4 w-full h-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-xl border flex-shrink-0 object-cover"
                    />
                    <div className="flex flex-col justify-center overflow-hidden">
                      <h3 className="font-semibold text-[#2a2927] text-base truncate max-w-[180px]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#7f6df2] font-medium">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 text-white bg-[#7f6df2] rounded-full hover:bg-[#6b5fcf]"
                    >
                      −
                    </button>
                    <span className="text-[#2a2927] font-medium w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 text-white bg-[#7f6df2] rounded-full hover:bg-[#6b5fcf]"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 ml-2"
                      title="Remove"
                    >
                      <HiOutlineTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-[350px] space-y-6">
          <div className="bg-white border border-[#e6e6e6] rounded-2xl p-6 shadow-sm space-y-4 mt-14">
            <h3 className="text-xl font-semibold text-[#2a2927] mb-2">
              Order Summary
            </h3>
            <div className="flex justify-between text-sm text-[#2a2927]">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#2a2927]">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount (10%):</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between font-bold text-lg text-[#2a2927]">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* Promo Input */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 px-3 py-2 border border-[#2a2927] rounded-lg text-sm text-[#2a2927] bg-transparent"
                disabled={couponApplied}
              />
              <button
                onClick={applyOrRemoveCoupon}
                className={`${
                  couponApplied
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#7f6df2] hover:bg-[#6b5fcf]"
                } text-white px-4 py-2 rounded-lg text-sm transition`}
              >
                {couponApplied ? "Remove Coupon" : "Apply"}
              </button>
            </div>
            <p className="text-xs text-gray-500 pt-1">
              Try "WELCOME10" for 10% off
            </p>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-[#2a2927] text-white py-3 rounded-full hover:bg-white hover:text-[#2a2927] hover:border hover:border-[#2a2927] transition-all font-medium"
          >
            Proceed to Checkout
          </button>

          <Link href="/#products">
            <button className="w-full border border-[#2a2927] text-[#2a2927] py-3 rounded-full hover:bg-[#2a2927] hover:text-white transition-all font-medium">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
