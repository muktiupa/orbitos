"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, Laptop } from "lucide-react";

export default function WhatWeDo() {
  const items = [
    {
      icon: <Zap className="text-cyan-400 w-10 h-10" />,
      title: "Autonomous Marketing Systems",
      subtitle: "Let AI take the wheel",
      desc: "We build self-optimizing marketing engines that attract, nurture, and convert leads automatically, so your growth runs on autopilot.",
      gradient: "from-[#570B8D] to-[#1E1E1E]",
    },
    {
      icon: <BarChart3 className="text-cyan-400 w-10 h-10" />,
      title: "Performance Ads Intelligence",
      subtitle: "Optimized Every Click",
      desc: "Our algorithms analyze data in real time to forecast trends, personalize targeting, and maximize ROI for your ad campaign.",
      gradient: "from-neutral-900 to-slate-800",
    },
    {
      icon: <Laptop className="text-cyan-400 w-10 h-10" />,
      title: "Adaptive Web Architecture",
      subtitle: "Smart Web that Converts",
      desc: "We develop AI-enhanced websites that adapt to user behavior, delivering personalized experiences that boost engagement and sales.",
      gradient: "from-neutral-900 to-slate-800",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-black via-neutral-950 to-purple-900 text-white py-20 px-6 text-center">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold"
        >
          What We Do
        </motion.h2>

        <p className="text-lg text-gray-300">
          <span className="text-white font-semibold">AI-Driven Marketing.</span> Limitless Growth.
        </p>

        <p className="max-w-2xl mx-auto text-gray-400">
          At OrbitOS, we merge artificial intelligence, automation, and performance science to
          accelerate your brand beyond boundaries.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`rounded-2xl p-8 text-left bg-gradient-to-br ${item.gradient} shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_0_60px_-10px_rgba(87,11,141,0.8)] transition-all duration-300`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <div className="inline-block bg-purple-700/20 text-purple-300 text-sm font-medium rounded-full px-3 py-1 mb-3">
                {item.subtitle}
              </div>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-20">
            <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:opacity-90 px-15 py-7 text-lg rounded-full shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105">
            Explore Our Solutions
            </Button>
        </div>
      </div>
    </section>
  );
}