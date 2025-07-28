'use client';

import React, { useState } from 'react';

interface AddProductModalProps {
  onClose: () => void;
  onSave: (product: { name: string; price: number; category: string; stock: number }) => void;
}

export default function AddProductModal({ onClose, onSave }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);

  const handleSubmit = () => {
    if (!name || !price || !category || stock < 0) {
      alert('Please fill all fields properly.');
      return;
    }

    const newProduct = { name, price, category, stock };
    onSave(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#2a2927]">Add New Product</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#72d3cb] text-white rounded hover:bg-[#5ab8b0]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
