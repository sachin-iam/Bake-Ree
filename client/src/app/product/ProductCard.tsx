'use client'
import React, { useState } from 'react';

export default function ProductCard({ product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold text-purple-700">₹{product.price}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <button onClick={() => setQty(q => Math.max(q - 1, 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
