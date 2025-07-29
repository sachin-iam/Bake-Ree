"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-hot-toast";

interface CustomerFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editCustomer?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    isActive?: boolean;
  } | null;
}

export default function CustomerFormModal({
  open,
  onClose,
  onSave,
  editCustomer,
}: CustomerFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (editCustomer) {
      setName(editCustomer.name);
      setEmail(editCustomer.email);
      setPhone(editCustomer.phone || "");
      setAddress(editCustomer.address || "");
      setIsActive(editCustomer.isActive ?? true);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setIsActive(true);
    }
  }, [editCustomer]);

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error("All fields are required.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    if (!/^[\w.-]+@(gmail|outlook|bake)\.com$/.test(email)) {
      toast.error("Only @gmail.com, @outlook.com, or @bake.com emails are allowed.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = { name, email, phone, address, isActive };
    const method = editCustomer ? "PUT" : "POST";
    const url = editCustomer
      ? `${BASE_URL}/api/customers/${editCustomer._id}`
      : `${BASE_URL}/api/customers`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(editCustomer ? "Customer updated" : "Customer added");
      onSave();
      onClose();
    } else {
      const data = await res.json();
      toast.error(data.message || "Failed to save customer.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="animate-scaleIn bg-white rounded-2xl shadow-xl w-full max-w-md px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          {editCustomer ? "Edit Customer" : "Add Customer"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-gray-800"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="accent-purple-600"
            />
            <label className="text-sm text-gray-800">Active</label>
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-purple-600 rounded-xl hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
