'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaLink,
  FaPlay,
  FaPause,
} from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const faqData = {
  General: [
    {
      id: 'faq1',
      question: 'What is an FAQ section?',
      answer:
        'An FAQ section can be used to quickly answer common questions about your business like "Where do you ship to?", "What are your opening hours?", or "How can I book a service?"',
    },
    {
      id: 'faq2',
      question: 'Why do FAQs matter?',
      answer:
        'FAQs help site visitors find answers and improve your site’s UX with better navigation.',
    },
    {
      id: 'faq3',
      question: 'Where can I add my FAQs?',
      answer: 'Add them from your dashboard under content or FAQs section.',
    },
  ],
  'Setting up FAQs': [
    {
      id: 'faq4',
      question: 'How do I add a new question & answer?',
      answer:
        'To add a new FAQ follow these steps:\n1. Go to your dashboard\n2. Add a new question & answer\n3. Assign it\n4. Save and publish.',
    },
    {
      id: 'faq5',
      question: 'Can I insert an image, video, or GIF in my FAQ?',
      answer: 'Yes, all media types can be added using the visual editor.',
    },
    {
      id: 'faq6',
      question: 'How do I edit or remove the FAQ title?',
      answer: 'Click the heading and edit the text like any section block.',
    },
  ],
};

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<'General' | 'Setting up FAQs'>('General');
  const [openId, setOpenId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const pinRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(scrollYProgress, [0, 0.4], ['0%', '-20%']);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`#${id}`);
  };

  return (
    <section className="bg-[#FDFCF7] text-black px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Left */}
        <div className="col-span-1">
          <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded mb-4">
            FAQ
          </span>
          <h2 className="text-5xl font-semibold leading-snug">
            You’re probably<br />
            wondering…
          </h2>
        </div>

        {/* Center FAQ */}
        <motion.div ref={pinRef} className="col-span-1 space-y-6" style={{ y: translateY }}>
          <h3 className="text-2xl font-bold">Frequently asked questions</h3>

          {/* Tabs */}
          <div className="flex space-x-6 text-base mb-4">
            {(['General', 'Setting up FAQs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-medium transition-colors ${
                  activeTab === tab ? 'text-black underline' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqData[activeTab].map((faq) => (
              <div key={faq.id} className="border-b py-4">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="flex justify-between w-full text-left group"
                >
                  <span className="text-base font-semibold">{faq.question}</span>
                  <span className="text-xl transform transition-transform group-hover:rotate-180">
                    {openId === faq.id ? '−' : '+'}
                  </span>
                </button>
                {openId === faq.id && (
                  <div className="mt-2 text-sm text-gray-700 space-y-3">
                    <p>{faq.answer}</p>
                    <div className="flex space-x-4 text-gray-700 text-xl">
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
        </motion.div>

        {/* Right Video */}
        <div className="col-span-1">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            {/* Scalloped Green Background */}
            <svg
              className="absolute inset-0 w-full h-full z-0"
              viewBox="0 0 400 500"
              preserveAspectRatio="none"
            >
              <path
                fill="#006633"
                d="
                  M0,50 
                  Q0,0 50,0 
                  H350 
                  Q400,0 400,50 
                  V450 
                  Q400,500 350,500 
                  H50 
                  Q0,500 0,450 
                  Z"
              />
            </svg>

            {/* Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover z-10"
              autoPlay={playing}
              loop
              muted
              playsInline
              poster="/faq-poster.png"
            >
              <source src="/faq-video.mp4" type="video/mp4" />
            </video>

            {/* Play/Pause */}
            <button
              onClick={() => setPlaying(!playing)}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/40 transition"
            >
              {playing ? (
                <FaPause className="text-white text-4xl" />
              ) : (
                <FaPlay className="text-white text-4xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
