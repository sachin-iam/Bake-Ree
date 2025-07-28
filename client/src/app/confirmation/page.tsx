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
    clearCart(); // ✅ Clear cart here only if data is valid
    window.scrollTo(0, 0);
  }
}, [orderType, name, email, phone, router]);


  // Redirect if essential data is missing
  useEffect(() => {
    if (!orderType || !name || !email || !phone) {
      router.replace("/");
    } else {
      window.scrollTo(0, 0);
    }
  }, [orderType, name, email, phone, router]);

  return (
    <section className="min-h-screen bg-[#f3f2ec] px-4 pt-32 pb-16 flex items-center justify-center">
      <div className="bg-white border border-[#2a2927] rounded-[20px] shadow-sm max-w-xl w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-600 text-5xl" />
        </div>

        <h1 className="text-2xl font-bold text-[#2a2927]">
          Thank You for Your Order! 🧁
        </h1>

        <p className="text-[#2a2927] text-sm">
          Your order has been successfully placed. We’re preparing it with care and love!
        </p>

        {orderType === "delivery" && (
          <div className="bg-[#fff8cc] text-[#6d5c00] text-sm p-4 rounded-xl">
            📦 <span className="font-semibold">Estimated Delivery:</span> 45–60 minutes
          </div>
        )}

        {orderType === "pickup" && (
          <div className="bg-[#fff8cc] text-[#6d5c00] text-sm p-4 rounded-xl">
            🏠 <span className="font-semibold">Pickup Ready In:</span> 15–30 minutes
          </div>
        )}

        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#2a2927] text-white hover:bg-white hover:text-[#2a2927] hover:border hover:border-[#2a2927] transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/product"
            className="px-6 py-3 rounded-full border border-[#2a2927] text-[#2a2927] hover:bg-[#2a2927] hover:text-white transition-all"
          >
            Order More
          </Link>
        </div>
      </div>
    </section>
  );
}
