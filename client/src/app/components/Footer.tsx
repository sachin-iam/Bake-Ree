import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#172b27] text-[#d4f3f0] px-6 pt-8 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">
        {/* Logo & Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Image
              src="/images/logo.png"
              alt="Bake Ree Logo"
              width={30}
              height={30}
              className="rounded-full bg-white p-1"
            />
            Bake Ree
          </div>
          <p className="text-xs text-[#d4f3f0]/80">
            Freshly baked delights, made with love every day.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="font-bold mb-2">QUICK LINKS</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/#home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-2">CONTACT</h4>
          <p>(555) 123-BAKE</p>
          <p>hello@bakeree.com</p>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-bold mb-2">ADDRESS</h4>
          <p>42 Pastry Lane</p>
          <p>Sweetville, CA 90210</p>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-bold mb-2">FOLLOW US</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/30 pt-6 text-xs text-[#d4f3f0] flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-center">© 2025 Bake Ree. All rights reserved.</p>
        <p className="text-center">
          Made with 🍰 &nbsp; by{" "}
          <Link href="/" className="underline hover:text-white">
            Bake Ree
          </Link>
        </p>
      </div>
    </footer>
  );
}
