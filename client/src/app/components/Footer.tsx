import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#172b27] text-[#d4f3f0] px-6 pt-40 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">
        {/* Logo */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <div className="bg-white text-[#2a2927] p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            Belsurance
          </div>
        </div>

        {/* Menu */}
        <div>
          <h4 className="font-bold mb-2">MENU</h4>
          <ul className="space-y-1">
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-2">CONTACT</h4>
          <p>123-456-7890</p>
          <p>info@mysite.com</p>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-bold mb-2">ADDRESS</h4>
          <p>500 Terry Francine Street.</p>
          <p>San Francisco, CA 94158</p>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-bold mb-2">SOCIAL</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-white/30 pt-6 text-xs text-[#d4f3f0] flex justify-between">
        <p>Privacy Policy</p>
        <p>© 2035 by Belsurance. Made with <a href="#" className="underline">Wix Studio™</a></p>
      </div>
    </footer>
  );
}
