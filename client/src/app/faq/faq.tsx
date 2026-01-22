"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaLink,
} from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const faqData = {
  General: [
    {
      id: "faq1",
      question: "Do you bake fresh every day?",
      answer:
        "Yes! All our breads, cakes, and pastries are freshly baked each morning to ensure quality and flavor.",
    },
    {
      id: "faq2",
      question: "Do you offer custom cakes?",
      answer:
        "Absolutely. We specialize in custom birthday, wedding, and celebration cakes. Contact us in advance!",
    },
    {
      id: "faq3",
      question: "Are your products eggless or vegan?",
      answer:
        "We offer a selection of eggless and vegan items. Just check the labels or ask our staff.",
    },
  ],
  Orders: [
    {
      id: "faq4",
      question: "How can I place an order?",
      answer:
        "You can place an order online via our website, or visit us in-store. For custom items, call us directly.",
    },
    {
      id: "faq5",
      question: "Do you deliver?",
      answer:
        "Yes, we offer local delivery within a 10 km radius for online and phone orders.",
    },
    {
      id: "faq6",
      question: "Can I schedule a pickup?",
      answer:
        "Absolutely. Choose your pickup date and time during checkout or give us a call.",
    },
  ],
};

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<"General" | "Orders">("General");
  const [openId, setOpenId] = useState<string | null>(null);
  const [rightOffset, setRightOffset] = useState(0);
  const [rightDelayActive, setRightDelayActive] = useState(false);
  const middleScrollRef = useRef<HTMLDivElement>(null);
  const rightDelayTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rightDelayTimerRef.current !== null) {
        window.clearTimeout(rightDelayTimerRef.current);
      }
    };
  }, []);

  const handleMiddleScroll = () => {
    const currentScrollTop = middleScrollRef.current?.scrollTop ?? 0;

    if (!rightDelayActive && rightDelayTimerRef.current === null) {
      rightDelayTimerRef.current = window.setTimeout(() => {
        setRightDelayActive(true);
        rightDelayTimerRef.current = null;
        setRightOffset(currentScrollTop);
      }, 100000);
    }

    if (rightDelayActive) {
      setRightOffset(currentScrollTop);
    }
  };
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`#${id}`);
  };

  return (
    <section className="bg-[#f3f2ec] text-black w-full flex flex-col md:flex-row relative px-6 pt-16 pb-8 md:min-h-screen md:items-start">
      {/* Left column - sticky heading */}
      <div className="md:w-1/3 h-fit self-start p-10 md:p-20 z-10 md:sticky md:top-24">
        <span className="inline-block bg-black text-white text-xs tracking-widest font-semibold px-4 py-2 rounded-br-xl mb-6">
          FAQ
        </span>
        <h2 className="text-5xl font-semibold leading-tight">
          You’re probably
          <br />
          wondering…
        </h2>
      </div>

      {/* Middle column - scrollable FAQ list */}
      <div
        ref={middleScrollRef}
        onScroll={handleMiddleScroll}
        className="md:w-1/3 z-10 px-6 pt-16 pb-12 md:max-h-[70vh] md:overflow-y-auto md:pr-3 no-scrollbar"
      >
        {/* Tabs */}
        <div className="flex space-x-6 text-base mb-4">
          {(["General", "Orders"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-medium transition-colors ${
                activeTab === tab
                  ? "text-black underline"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData[activeTab].map((faq) => (
            <div key={faq.id} className="border-b pb-6">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex justify-between w-full text-left group"
              >
                <span className="text-base font-semibold">{faq.question}</span>
                <span className="text-xl transform transition-transform group-hover:rotate-180 cursor-pointer">
                  {openId === faq.id ? "−" : "+"}
                </span>
              </button>
              {openId === faq.id && (
                <div className="mt-2 text-sm text-gray-700 space-y-3">
                  <p>{faq.answer}</p>
                  <div className="flex space-x-4 text-gray-700 text-xl cursor-pointer">
                    <FaFacebookF />
                    <FaXTwitter />
                    <FaLinkedinIn />
                    <div className="relative">
                      <FaLink
                        data-tooltip-id={faq.id}
                        data-tooltip-content="Copy link to question"
                        onClick={() => handleCopy(faq.id)}
                        className="cursor-pointer"
                      />
                      <Tooltip id={faq.id} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Video */}
      <div
        className="md:w-1/3 h-fit self-start p-10 z-10 flex items-center justify-center md:sticky md:top-24 transition-transform duration-700 ease-out"
        style={{
          transform: rightDelayActive
            ? `translateY(-${rightOffset}px)`
            : "translateY(0px)",
        }}
      >
        <div className="relative w-full max-w-[52.5vh] max-h-[70vh] aspect-[3/4] overflow-hidden rounded-[40px]">
          {/* Decorative Scalloped Sides (SVG Mask alternative) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute left-0 top-0 h-full w-5 text-[#006633] fill-current"
            >
              <path d="M100,0 Q50,20 100,40 Q50,60 100,80 Q50,100 100,120" />
            </svg>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute right-0 top-0 h-full w-5 text-[#006633] fill-current rotate-180"
            >
              <path d="M100,0 Q50,20 100,40 Q50,60 100,80 Q50,100 100,120" />
            </svg>
          </div>

          {/* Video Content */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-10"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/faq-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
