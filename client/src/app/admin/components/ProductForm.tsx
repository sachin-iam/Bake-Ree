'use client'
import { useState } from 'react'

export default function ProductForm() {
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState([
    { name: 'Artisan Sourdough', category: 'Breads', price: 8.99, stock: 12 },
    { name: 'French Croissants', category: 'Pastries', price: 4.5, stock: 24 },
    { name: 'Chocolate Éclair', category: 'Pastries', price: 6.25, stock: 8 },
    { name: 'Red Velvet Cake', category: 'Cakes', price: 45.0, stock: 3 },
  ])

  const addProduct = (product: any) => {
    setProducts([...products, product])
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2 rounded-md shadow-md"
        >
          + Add Product
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-semibold text-[#2a2927]">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="text-[#2a2927] font-semibold">${product.price}</p>
              <p className="text-xs text-gray-500">Stock: {product.stock}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm px-3 py-1 rounded-md bg-[#f3f2ec] border border-[#d97706] text-[#d97706] hover:bg-[#faede5]">
                Edit
              </button>
              <button className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
