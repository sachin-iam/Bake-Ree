"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
      toast.success("Coupon removed");
    } else {
      // Apply coupon
      if (promoCode.toLowerCase() === "welcome10") {
        setAppliedDiscount(0.1);
        setCouponApplied(true);
        toast.success("Coupon applied");
      } else {
        toast.error("Invalid promo code");
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
    <section className="min-h-screen bg-gradient-to-b from-[#f7f5f0] via-[#f3f2ec] to-[#efeee9] px-4 pt-36 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#1f1d1a]">
                Cart Items
              </h2>
              <p className="text-sm text-[#6d665c]">
                {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
              </p>
            </div>
          </div>
          {cart.length === 0 ? (
            <div className="bg-white/80 border border-black/5 rounded-3xl p-10 text-center shadow-sm">
              <p className="text-[#2a2927] text-lg font-medium">
                Your cart is empty.
              </p>
              <p className="text-sm text-[#6d665c] mt-2">
                Explore fresh bakes and add your favorites.
              </p>
              <Link href="/product">
                <button className="mt-6 px-5 py-2.5 rounded-full border border-[#2a2927] text-[#2a2927] hover:bg-[#2a2927] hover:text-white transition">
                  Browse Products
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-black/5 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_10px_28px_rgba(20,15,10,0.06)]"
                >
                  <div className="flex items-center gap-4 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-2xl border border-black/10 flex-shrink-0 object-cover"
                    />
                    <div className="flex flex-col justify-center overflow-hidden">
                      <h3 className="font-semibold text-[#1f1d1a] text-base truncate max-w-[220px]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#6a4b2a] font-medium">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-9 h-9 text-[#2a2927] border border-[#d9d3c7] rounded-full hover:bg-[#2a2927] hover:text-white transition"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      −
                    </button>
                    <span className="text-[#2a2927] font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-9 h-9 text-[#2a2927] border border-[#d9d3c7] rounded-full hover:bg-[#2a2927] hover:text-white transition"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success("Removed from cart");
                      }}
                      className="text-[#b44b3a] hover:text-[#8e3b2d] ml-2"
                      title="Remove"
                      aria-label={`Remove ${item.name}`}
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
        <div className="w-full lg:w-[360px] space-y-6">
          <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-[0_10px_28px_rgba(20,15,10,0.06)] space-y-4 lg:mt-12">
            <h3 className="text-xl font-semibold text-[#1f1d1a] mb-2">
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
              <div className="flex justify-between text-sm text-green-700">
                <span>Discount (10%):</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <hr className="border-black/10" />
            <div className="flex justify-between font-semibold text-lg text-[#1f1d1a]">
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
                className="flex-1 px-4 py-2.5 border border-black/10 rounded-full text-sm text-[#2a2927] bg-[#f8f7f4] focus:outline-none focus:ring-2 focus:ring-[#2a2927]/15"
                disabled={couponApplied}
              />
              <button
                onClick={applyOrRemoveCoupon}
                className={`${
                  couponApplied
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-[#2a2927] hover:bg-[#1f1d1a]"
                } text-white px-4 py-2.5 rounded-full text-sm transition`}
              >
                {couponApplied ? "Remove Coupon" : "Apply"}
              </button>
            </div>
            <p className="text-xs text-[#6d665c] pt-1">
              Try "WELCOME10" for 10% off
            </p>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-[#2a2927] text-white py-3 rounded-full shadow-sm hover:bg-[#1f1d1a] transition font-medium"
          >
            Proceed to Checkout
          </button>

          <Link href="/#products">
            <button className="w-full border border-[#2a2927] text-[#2a2927] py-3 rounded-full hover:bg-[#2a2927] hover:text-white transition font-medium">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
