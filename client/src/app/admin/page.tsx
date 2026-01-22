const quickStats = [
  { label: "Live Orders", value: "128", delta: "+12%" },
  { label: "Revenue Today", value: "₹84,920", delta: "+6.4%" },
  { label: "On-time SLA", value: "94.8%", delta: "+1.2%" },
  { label: "Active Customers", value: "2,304", delta: "+2.1%" },
];

const orders = [
  {
    id: "BR-10031",
    customer: "Aanya Sharma",
    status: "Preparing",
    total: "₹1,299",
    channel: "Online",
  },
  {
    id: "BR-10032",
    customer: "Neel Mehta",
    status: "Ready",
    total: "₹749",
    channel: "Pickup",
  },
  {
    id: "BR-10033",
    customer: "Zara Patel",
    status: "Delivering",
    total: "₹499",
    channel: "COD",
  },
  {
    id: "BR-10034",
    customer: "Rahul Kapoor",
    status: "Delivered",
    total: "₹320",
    channel: "In-Store",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
                Admin / Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2a2927]">
                Command Center
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#5c5a56]">
                Real-time visibility across orders, revenue, customer health, and
                operations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-black/10 px-4 py-2 text-xs text-[#2a2927]">
                Export Snapshot
              </button>
              <button className="rounded-full bg-[#2a2927] px-4 py-2 text-xs font-semibold text-white">
                View Orders
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-[#f9f7f2] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
                Operations Pulse
              </p>
              <p className="mt-3 text-2xl font-semibold text-[#2a2927]">94.8%</p>
              <p className="text-sm text-[#5c5a56]">On-time delivery SLA</p>
              <div className="mt-4 h-2 w-full rounded-full bg-white">
                <div className="h-2 w-[94.8%] rounded-full bg-[#2a2927]" />
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#f9f7f2] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
                Revenue Today
              </p>
              <p className="mt-3 text-2xl font-semibold text-[#2a2927]">₹84,920</p>
              <p className="text-sm text-[#5c5a56]">+6.4% vs yesterday</p>
              <div className="mt-4 h-2 w-full rounded-full bg-white">
                <div className="h-2 w-[72%] rounded-full bg-[#2a2927]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#9a958d]">
                {stat.label}
              </p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl font-semibold text-[#2a2927]">
                  {stat.value}
                </p>
                <span className="rounded-full bg-[#dff1e6] px-2 py-1 text-xs font-semibold text-[#2e7d4f]">
                  {stat.delta}
                </span>
              </div>
              <div className="mt-4 h-10 w-full rounded-xl bg-gradient-to-r from-[#2a2927] via-[#6f6a63] to-[#cfc9bf] opacity-20" />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[2.2fr_1fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#2a2927]">
                Revenue & Orders
              </h3>
              <p className="text-sm text-[#6b6b6b]">
                Daily revenue trend with order volume overlay.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
              <span className="rounded-full border border-black/10 px-3 py-1">7D</span>
              <span className="rounded-full border border-black/10 px-3 py-1">30D</span>
              <span className="rounded-full bg-[#2a2927] px-3 py-1 text-white">
                90D
              </span>
            </div>
          </div>
          <div className="mt-6 h-60 w-full rounded-2xl border border-dashed border-black/10 bg-[#f9f7f2] p-4">
            <svg viewBox="0 0 600 200" className="h-full w-full">
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a2927" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2a2927" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M0 150 C 80 120, 140 90, 200 110 C 260 130, 320 70, 380 85 C 440 100, 500 60, 600 50"
                fill="none"
                stroke="#2a2927"
                strokeWidth="3"
              />
              <path
                d="M0 150 C 80 120, 140 90, 200 110 C 260 130, 320 70, 380 85 C 440 100, 500 60, 600 50 L 600 200 L 0 200 Z"
                fill="url(#rev)"
              />
              <path
                d="M0 170 C 90 160, 160 140, 230 150 C 300 160, 360 120, 420 130 C 500 140, 560 110, 600 105"
                fill="none"
                stroke="#8b8b8b"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2a2927]">Customer Health</h3>
          <p className="text-sm text-[#6b6b6b]">Tier distribution and churn risk.</p>
          <div className="mt-6 space-y-4">
            {[
              { label: "Platinum", value: 28, color: "bg-[#2a2927]" },
              { label: "Gold", value: 42, color: "bg-[#5b554e]" },
              { label: "Silver", value: 68, color: "bg-[#8b867f]" },
              { label: "Bronze", value: 120, color: "bg-[#c8c2b8]" },
            ].map((tier) => (
              <div key={tier.label}>
                <div className="flex items-center justify-between text-sm text-[#2a2927]">
                  <span>{tier.label}</span>
                  <span>{tier.value}</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#f1f1f1]">
                  <div
                    className={`h-2 rounded-full ${tier.color}`}
                    style={{ width: `${tier.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#2a2927]">Live Orders</h3>
            <p className="text-sm text-[#6b6b6b]">
              Latest orders flowing through the system.
            </p>
          </div>
          <button className="rounded-full border border-black/10 px-4 py-2 text-xs text-[#2a2927]">
            View All
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-black/10 text-xs uppercase tracking-[0.2em] text-[#9a958d]">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {orders.map((order) => (
                <tr key={order.id} className="text-[#2a2927]">
                  <td className="px-4 py-4 font-semibold">{order.id}</td>
                  <td className="px-4 py-4">{order.customer}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-[#f2f2f2] px-2 py-1 text-xs font-semibold text-[#2a2927]">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">{order.total}</td>
                  <td className="px-4 py-4 text-sm text-[#6b6b6b]">
                    {order.channel}
                  </td>
                  <td className="px-4 py-4">
                    <button className="rounded-lg border border-black/10 px-3 py-1 text-xs text-[#2a2927]">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
