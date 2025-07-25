"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactForm() {
  const [phone, setPhone] = useState("");

  return (
    <section className="bg-[#afa5f7] py-20 px-6 rounded-[3rem] max-w-7xl mx-auto mt-[-2rem] relative z-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Heading */}
        <div className="text-[#2a2927]">
          <h2 className="text-6xl font-light leading-tight">
            Get
            <br />
            in Touch
          </h2>
        </div>

        {/* Right Form */}
        <form className="space-y-6 text-[#2a2927]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">
                First name *
              </label>
              <input
                type="text"
                required
                className="w-full border-b border-[#2a2927] bg-transparent focus:outline-none py-1"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Last name *
              </label>
              <input
                type="text"
                required
                className="w-full border-b border-[#2a2927] bg-transparent focus:outline-none py-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Email *</label>
              <input
                type="email"
                required
                className="w-full border-b border-[#2a2927] bg-transparent focus:outline-none py-1"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone</label>
              <div className="relative">
                {/* SVG Globe Button */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-full flex items-center justify-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    className="text-[#2a2927]"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
             10-4.48 10-10S17.52 2 12 2zm6.93 6H17.5a16.8 16.8 0 0 0-1.44-3.85
             8.025 8.025 0 0 1 2.87 3.85zM12 4c.71 0 1.99 1.7 2.62 5h-5.24C10.01 5.7 11.29 4 12 4zM6.5 8H5.07a8.025 8.025 0 0 1 2.87-3.85
             A16.8 16.8 0 0 0 6.5 8zM4 12c0-.7.1-1.37.27-2h3.35a19.9 19.9 0 0 0 0 4H4.27c-.17-.63-.27-1.3-.27-2zm1.07 6H6.5
             a16.8 16.8 0 0 0 1.44 3.85A8.025 8.025 0 0 1 5.07 18zm2.62-6h5.24c-.63 3.3-1.91 5-2.62 5s-1.99-1.7-2.62-5zM12 20c-.71 0-1.99-1.7-2.62-5h5.24
             C13.99 18.3 12.71 20 12 20zm3.56-.15A16.8 16.8 0 0 0 17.5 16h1.43a8.025 8.025 0 0 1-2.87 3.85zM16.38 14h-5.24c.63-3.3
             1.91-5 2.62-5s1.99 1.7 2.62 5zM16.38 10h-5.24c.63-3.3
             1.91-5 2.62-5s1.99 1.7 2.62 5zM17.5 14h1.43c.17-.63.27-1.3.27-2s-.1-1.37-.27-2H17.5a19.9 19.9 0 0 1 0 4z"
                    />
                  </svg>
                </div>
              </div>

              {/* Phone Input */}
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={setPhone}
                enableSearch
                disableSearchIcon={false}
                inputClass="custom-phone-input"
                dropdownClass="custom-phone-dropdown"
                searchClass="custom-phone-search"
                containerClass="custom-phone-container"
                buttonStyle={{ display: "none" }} // Hide default flag
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Company / Organization Name
            </label>
            <input
              type="text"
              className="w-full border-b border-[#2a2927] bg-transparent focus:outline-none py-1"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              How can we help?
            </label>
            <textarea
              className="w-full border-b border-[#2a2927] bg-transparent focus:outline-none py-1"
              rows={2}
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#2a2927] text-white rounded-full px-8 py-3 hover:bg-white hover:text-black hover:border hover:border-[#2a2927] transition-all duration-200"
            >
              Get a quote
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
