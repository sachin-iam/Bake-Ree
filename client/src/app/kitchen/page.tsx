'use client';

import { useEffect, useState } from 'react';
import { BsPersonFill, BsClock } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';

type OrderStatus = 'pending' | 'preparing' | 'ready';

interface Order {
  id: string;
  customer: string;
  items: string[];
  placedAt: string;
  status: OrderStatus;
}

const getStatusColor = (status: OrderStatus) => {
  return clsx(
    'text-xs font-medium px-2 py-0.5 rounded-full transition-all duration-300',
    status === 'pending' && 'bg-yellow-200 text-yellow-900',
    status === 'preparing' && 'bg-orange-200 text-orange-900',
    status === 'ready' && 'bg-green-200 text-green-900'
  );
};

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sound] = useState(() => new Audio('./sounds/notify.mp3'));

  useEffect(() => {
    // Simulated fetch
    const fetchOrders = () => {
      setOrders([
        {
          id: 'ORD-001',
          customer: 'John Doe',
          items: ['Chocolate Cake', 'Croissant'],
          placedAt: '2 mins ago',
          status: 'preparing',
        },
        {
          id: 'ORD-002',
          customer: 'Jane Smith',
          items: ['Baguette', 'Red Velvet Cake'],
          placedAt: '5 mins ago',
          status: 'pending',
        },
        {
          id: 'ORD-003',
          customer: 'Emma Jones',
          items: ['Sourdough', 'Donuts'],
          placedAt: '1 min ago',
          status: 'ready',
        },
      ]);
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      )
    );
    toast.success(`Order ${id} marked as ${newStatus.toUpperCase()}`);
    sound.play().catch(() => {});
  };

  return (
    <section className="min-h-screen bg-[#f3f2ec] px-4 py-24">
      <Toaster />
      <h1 className="text-3xl font-semibold text-[#2a2927] mb-10 text-center">
        Kitchen Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id + order.status} // rerender on status
            className="bg-white rounded-2xl p-5 shadow-md border border-[#2a2927] transform transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-[#2a2927]">{order.id}</h2>
              <span className={getStatusColor(order.status)}>
                {order.status}
              </span>
            </div>

            <p className="flex items-center gap-2 text-sm text-[#2a2927] font-medium mb-2">
              <BsPersonFill /> {order.customer}
            </p>

            <ul className="list-disc ml-5 text-sm text-[#2a2927] mb-3">
              {order.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <p className="flex items-center gap-1 text-xs text-gray-500 mb-4">
              <BsClock className="text-sm" /> {order.placedAt}
            </p>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-orange-200 text-[#2a2927] py-2 rounded-md text-sm font-medium hover:bg-orange-300 transition-all"
                onClick={() => updateStatus(order.id, 'preparing')}
              >
                Preparing
              </button>
              <button
                className="flex-1 bg-green-300 text-[#2a2927] py-2 rounded-md text-sm font-medium hover:bg-green-400 transition-all"
                onClick={() => updateStatus(order.id, 'ready')}
              >
                Mark Ready
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
