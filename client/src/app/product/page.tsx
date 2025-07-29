'use client'
import React, { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import FilterBar from './FilterBar';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('/api/products') // Adjust if your route is different
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  return (
    <div className="p-8 bg-[#f8f6f2] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <FilterBar products={products} setFiltered={setFiltered} />
      <ProductGrid products={filtered} />
    </div>
  );
};

export default ProductPage;
