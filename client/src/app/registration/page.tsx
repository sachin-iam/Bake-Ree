"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function RegistrationPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Registering:", form);
    // TODO: Send to backend
  };

  return (
    <section className="min-h-screen bg-[#f3f2ec] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#afa5f7] rounded-[2rem] p-4 md:p-5 shadow-md mt-15">
        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#2a2927]">
            Create Your Account
          </h1>
        </div>

        {/* Divider */}
        <div className="text-center text-[#2a2927] text-sm mb-6">
          Sign up with email
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-[#2a2927]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-0.5 text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#2a2927] py-1 px-1 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-0.5 text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#2a2927] py-1 px-1 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-0.5 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-[#2a2927] py-1 px-1 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="block mb-0.5 text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-[#2a2927] py-1 px-1 pr-10 focus:outline-none"
            />
            <div
              className="absolute right-2 top-[1.45rem] cursor-pointer text-xl text-[#2a2927]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </div>
          </div>

          <div className="relative">
            <label className="block mb-0.5 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-[#2a2927] py-1 px-1 pr-10 focus:outline-none"
            />
            <div
              className="absolute right-2 top-[1.45rem] cursor-pointer text-xl text-[#2a2927]"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <HiEyeOff /> : <HiEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2a2927] text-white py-2.5 rounded-full hover:bg-white hover:text-[#2a2927] hover:border hover:border-[#2a2927] transition-all"
          >
            Register
          </button>
        </form>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 my-4">
          <button
            className="bg-white p-3 rounded-full transition-all duration-200 hover:scale-105"
            aria-label="Signup with Google"
          >
            <FcGoogle className="text-2xl" />
          </button>
          <button
            className="bg-white p-3 rounded-full transition-all duration-200 hover:scale-105"
            aria-label="Signup with Apple"
          >
            <FaApple className="text-2xl text-black" />
          </button>
          <button
            className="bg-white p-3 rounded-full transition-all duration-200 hover:scale-105"
            aria-label="Signup with Microsoft"
          >
            <Image
              src="/icons/microsoft.svg"
              alt="Microsoft"
              width={22}
              height={22}
              className="rounded-sm"
            />
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-1 text-center text-sm text-[#2a2927]">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-black">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
