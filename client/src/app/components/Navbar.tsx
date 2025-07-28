'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useCartStore } from '../../store/cartStore'; 

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/product' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cart } = useCartStore();
  const hasItems = cart.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      } flex justify-center bg-transparent py-1 pt-5`}
    >
      <div className="w-full max-w-7xl flex items-center justify-between bg-white rounded-full px-6 py-3 shadow-sm">
        {/* Logo + Brand Name */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Bake Ree Logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
          </Link>
          <span className="text-lg ml-2 font-semibold text-[#2a2927]">Bake Ree</span>
        </div>

        {/* Navigation Links + Icons */}
        <div className="flex items-center space-x-6 text-sm font-medium text-[#2a2927]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-teal-600 ${
                pathname === link.href ? 'text-teal-600' : ''
              }`}
              scroll={true}
            >
              {link.name}
            </Link>
          ))}

          {/* 🛒 Cart Icon with Dot */}
          <Link href="/cart">
            <div
              id="cart-icon"
              className="relative cursor-pointer hover:text-teal-600 transition-all"
            >
              <HiOutlineShoppingCart className="text-2xl" />
              {hasItems && (
                <>
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </>
              )}
            </div>
          </Link>

          {/* Login Button */}
          <Link href="/login">
            <button className="px-5 py-2 rounded-full text-white transition-all duration-200 font-medium bg-[#2a2927] hover:bg-white hover:text-black hover:border hover:border-[#2a2927]">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
