"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="bg-[#f3f2ec] py-30 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto mt-[-10px] flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Left Text */}
        <div className="flex-1 pt-4">
          <h1 className="text-7xl md:text-7xl font-light text-[#2a2927] leading-tight mb-6">
            Insurance
            <br />
            Coverage You
            <br />
            Can Count On
          </h1>
          <p className="text-xl text-[#2a2927] mb-8">
            Wherever and whenever you need.
            <br />
            It’s our job to protect you and what matters to you most.
          </p>
          <Link href="/contact">
            <button className="bg-[#005c45] text-white rounded-full px-6 py-3 hover:bg-teal-700 transition-all duration-200">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Right - B Shape Grid */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="grid grid-cols-2 grid-rows-3  w-[620px] h-[560px] relative"
        >
          {/* Top row wrapper (flex container to sync movements) */}
          <div className="col-span-2 row-span-1 h-full flex relative w-[620px]">
            {/* Left Block (animated) */}
            <div className="relative w-[300px] h-full flex items-stretch overflow-visible">
              {/* Static green band */}
              <div className="relative z-0 w-full h-full bg-[#244438] rounded-tl-[120px] rounded-br-[150px]" />

              {/* Sliding blue band */}
              <div
                className={`absolute top-0 left-0 z-10 w-full h-full bg-[#b6d3e5] rounded-tl-[120px] rounded-br-[150px] transition-transform duration-700 ease-in-out ${
                  hovered ? "translate-x-[40px]" : "translate-x-0"
                }`}
              />

              {/* Image layer */}
              <div
                className={`absolute top-0 left-0 z-20 w-[300px] h-full rounded-tl-[120px] rounded-br-[150px] overflow-hidden transition-transform duration-700 ease-in-out ${
                  hovered ? "translate-x-[80px]" : "translate-x-0"
                }`}
              >
                <Image
                  src="/images/baker.jpg"
                  alt="Baker Girl"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Block – fixed width, right-pinned, offset further right */}
            <div className="relative h-full">
              {/* Outer container with right-offset applied */}
              <div className="absolute top-0 left-0 h-full w-80 overflow-hidden">
                {/* Purple fill that shifts left edge inward on hover */}
                <div
                  className={`h-full bg-[#aea4ff] rounded-bl-[120px] transition-transform duration-700 ease-in-out ${
                    hovered ? "translate-x-[80px]" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Middle-left */}
          <div className="w-[420px] h-[186px] bg-[#244438] rounded-r-full" />

          {/* Middle-right - animated layered circle (slides left) */}
          <div className="relative col-span-1 row-span-1 w-[185px] h-[185px] ml-[110px]">
            {/* Layer 1: green base circle */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#008066] rounded-full z-0" />

            {/* Layer 2: purple arc slides left */}
            <div
              className={`absolute top-0 left-0 w-full h-full bg-[#afa5f7] rounded-full z-10 transition-transform duration-700 ease-in-out ${
                hovered ? "-translate-x-[40px]" : "translate-x-0"
              }`}
            />

            {/* Layer 3: foreground image slides further left */}
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-full overflow-hidden z-20 transition-transform duration-700 ease-in-out ${
                hovered ? "-translate-x-[80px]" : "translate-x-0"
              }`}
            >
              <Image
                src="/images/cake-circle.jpg"
                alt="Cake Circle"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom-left */}
          <div className="relative rounded-bl-[100px] h-full overflow-hidden">
            <Image
              src="/images/croissant.jpg"
              alt="Croissant"
              fill
              className={`object-cover transition-transform duration-500 ${
                hovered ? "scale-105" : ""
              }`}
            />
          </div>

          {/* Bottom-right */}
          <div className="relative h-full w-full overflow-hidden rounded-r-[100px] transition-all duration-500">
            <div className="flex h-full w-full">
              {/* Left light blue stripe */}
              <div
                className={`h-full transition-all duration-500 ${
                  hovered ? "bg-[#b6d3e5] w-[60px]" : "bg-[#b6d3e5] w-[60px]"
                }`}
              />
              {/* Middle dark green stripe */}
              <div
                className={`h-full transition-all duration-500 ${
                  hovered ? "bg-[#244438] w-[60px]" : "bg-[#244438] w-[60px]"
                }`}
              />
              {/* Remaining green background */}
              <div className="flex-1 h-full bg-[#008066]" />
            </div>

            {/* Hover overlay fills from right to left */}
            <div
              className={`absolute top-0 right-0 h-full bg-[#008066] transition-all duration-500 ease-in-out pointer-events-none ${
                hovered ? "w-full" : "w-0"
              }`}
            />

            {/* Bottom underline accent bar */}
            <div className="absolute bottom-0 right-0 h-[5px] w-[30px] bg-[#008066] rounded-bl-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
