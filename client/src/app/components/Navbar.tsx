'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
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
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-[#2a2927] text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-[#2a2927]">
            Belsurance
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 text-sm font-medium text-[#2a2927]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-teal-600 ${
                pathname === link.href ? 'text-teal-600' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Contact Button */}
          <Link href="/contact">
            <button
              className={`px-5 py-2 rounded-full text-white transition-all duration-200 font-medium ${
                pathname === '/contact'
                  ? 'bg-teal-700'
                  : 'bg-[#2a2927] hover:bg-teal-700'
              }`}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
