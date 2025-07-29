'use client'
import React, { useEffect, useState } from 'react';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    const interval = setInterval(() => {
      setVisible(prev => (prev + 3) % 6); // rotate
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10 bg-[#fff9f2]">
      <h2 className="text-2xl font-bold text-center mb-4">Featured Delights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.slice(visible, visible + 3).map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
