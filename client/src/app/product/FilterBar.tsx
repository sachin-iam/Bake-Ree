'use client'
import React, { useState } from 'react';

export default function FilterBar({ products, setFiltered }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(products.filter(p => p.name.toLowerCase().includes(value)));
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
        className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm"
      />
    </div>
  );
}
