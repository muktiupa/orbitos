"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function WhatWeDo() {
  const items = [
    {
      img: "/assets/Autonomous Marketing.png",
      title: "Autonomous Marketing Systems",
      subtitle: "Let AI take the wheel",
      desc: "We build self-optimizing marketing engines that attract, nurture, and convert leads automatically, so your growth runs on autopilot.",
      gradient: "from-[#570B8D] to-[#1E1E1E]",
    },
    {
      img: "/assets/Performance Ads.png",
      title: "Performance Ads Intelligence",
      subtitle: "Optimized Every Click",
      desc: "Our algorithms analyze data in real time to forecast trends, personalize targeting, and maximize ROI for your ad campaign.",
      gradient: "from-neutral-900 to-slate-800",
    },
    {
      img: "/assets/Web Architecture.png",
      title: "Adaptive Web Architecture",
      subtitle: "Smart Web that Converts",
      desc: "We develop AI-enhanced websites that adapt to user behavior, delivering personalized experiences that boost engagement and sales.",
      gradient: "from-neutral-900 to-slate-800",
    },
  ];

  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #000000 42%, #590B90 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* ====== Heading Section ====== */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What We Do
        </h2>
        <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-3">
          AI-Driven Marketing. Limitless Growth.
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
          At OrbitOS, we merge artificial intelligence, automation, and performance
          science to accelerate your brand beyond boundaries.
        </p>

        {/* ====== Feature Cards ====== */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`relative overflow-visible rounded-2xl p-8 text-left bg-gradient-to-br ${item.gradient} transition-all duration-300 shadow-[0_0_40px_-15px_rgba(123,31,162,0.5)] hover:shadow-[0_0_90px_-10px_rgba(255,255,255,0.4)] border border-transparent hover:border-purple-500/40`}
            >
              {/* Floating Image */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]"
                />
              </motion.div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {item.title}
                </h3>
                <div className="inline-block bg-purple-700/30 text-purple-200 text-sm font-medium rounded-full px-4 py-1 mb-4 shadow-inner">
                  {item.subtitle}
                </div>
                <p className="text-gray-300 leading-relaxed text-[15px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ====== CTA Button ====== */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            size="lg-2xl"
            className="bg-gradient-to-r from-[#F7544B] to-[#FFEE00] text-[#010101] 
                      font-semibold text-xl px-15 py-5 rounded-full shadow-lg 
                      hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] transition"
          >
            Explore Our Solutions
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
