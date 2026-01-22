"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore"; // adjust path as needed

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderType = searchParams.get("orderType");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (!orderType || !name || !email || !phone) {
      router.replace("/");
    } else {
      clearCart();
      window.scrollTo(0, 0);
    }
  }, [orderType, name, email, phone, router, clearCart]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f5f0] via-[#f3f2ec] to-[#efeee9] px-4 pt-32 pb-16 flex items-center justify-center">
      <div className="bg-white border border-black/5 rounded-[28px] shadow-[0_18px_50px_rgba(20,15,10,0.12)] max-w-xl w-full p-8 sm:p-10 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-[#eff6f0] flex items-center justify-center border border-[#dce7df]">
            <FaCheckCircle className="text-[#2f8f55] text-4xl" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1f1d1a]">
          Thank You for Your Order! 🧁
        </h1>

        <p className="text-[#6d665c] text-sm sm:text-base">
          Your order has been successfully placed. We are preparing it with care
          and love.
        </p>

        {orderType === "delivery" && (
          <div className="bg-[#f6f1e8] text-[#6a4b2a] text-sm p-4 rounded-2xl border border-[#eadfcd]">
            📦 <span className="font-semibold">Estimated Delivery:</span> 45–60
            minutes
          </div>
        )}

        {orderType === "pickup" && (
          <div className="bg-[#f6f1e8] text-[#6a4b2a] text-sm p-4 rounded-2xl border border-[#eadfcd]">
            🏠 <span className="font-semibold">Pickup Ready In:</span> 15–30
            minutes
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#2a2927] text-white hover:bg-[#1f1d1a] transition"
          >
            Back to Home
          </Link>
          <Link
            href="/product"
            className="px-6 py-3 rounded-full border border-[#2a2927] text-[#2a2927] hover:bg-[#2a2927] hover:text-white transition"
          >
            Order More
          </Link>
        </div>
      </div>
    </section>
  );
}
