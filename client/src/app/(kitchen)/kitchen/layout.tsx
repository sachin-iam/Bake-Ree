"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import KitchenSidebar from "@/components/kitchen/KitchenSidebar";
import { isKitchenStaff, isAdmin } from "@/utils/auth";

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDev = process.env.NODE_ENV !== "production";

  useEffect(() => {
    if (isDev) {
      setChecking(false);
      return;
    }

    const checkAccess = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login?redirect=" + encodeURIComponent(pathname));
        return;
      }

      if (!isKitchenStaff() && !isAdmin()) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const user = await response.json();
            if (user.role !== "kitchen_staff" && user.role !== "admin" && !user.isAdmin) {
              router.push("/dashboard");
              return;
            }
          } else {
            router.push("/login?redirect=" + encodeURIComponent(pathname));
            return;
          }
        } catch (error) {
          console.error("Error checking kitchen access:", error);
          router.push("/login?redirect=" + encodeURIComponent(pathname));
          return;
        }
      }

      setChecking(false);
    };

    checkAccess();
  }, [router, pathname, isDev]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#f3f2ec] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2927] mx-auto mb-4" />
          <p className="text-xl text-[#2a2927]">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f3f2ec]">
      <div className="flex h-full">
        <KitchenSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 overflow-y-auto pt-0 pb-8 pl-4 pr-4 lg:ml-[240px] lg:px-8">
          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-full border border-[#eadfd1] bg-white px-4 py-2 text-sm font-semibold text-[#2a2927]"
            >
              Open Kitchen Menu
            </button>
          </div>
          <div className="mx-auto w-full max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
