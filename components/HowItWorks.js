"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // ✅ Make sure you have this imported

export default function HowItWorks() {
  const steps = [
    {
      title: "Discover",
      desc: "We deep-dive into your brand’s DNA, audience, and goals — mapping the opportunities where AI can amplify performance and automate growth.",
      img: "/assets/Discover (2).png",
    },
    {
      title: "Design",
      desc: "We architect intelligent systems — from lead funnels to content engines — ensuring seamless automation and measurable results.",
      img: "/assets/Design (2).png",
    },
    {
      title: "Deploy",
      desc: "We implement AI-powered workflows, campaigns, and adaptive web structures that learn, evolve, and perform in real time.",
      img: "/assets/Deploy.png",
    },
    {
      title: "Optimize",
      desc: "The OrbitOS engine continuously analyzes behavior, adjusts strategies, and scales performance autonomously for exponential growth.",
      img: "/assets/Optimise.png",
    },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #590B90 0%, #000000 70%)",
      }}
    >
      {/* ===== Background Glow ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* ===== Container ===== */}
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          How It Works
        </h2>
        <h3 className="text-gray-300 text-lg md:text-xl font-medium mb-6">
          From Strategy to Scale{" "}
          <span className="text-purple-400">(Powered by AI Intelligence)</span>
        </h3>
        <p className="text-gray-400 max-w-3xl mx-auto mb-20 leading-relaxed">
          OrbitOS doesn’t just automate — it learns, adapts, and evolves.  
          Here’s how we turn intelligence into unstoppable momentum for your brand.
        </p>

        {/* ===== Steps Grid ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10 
                         shadow-[0_0_35px_-10px_rgba(120,0,255,0.5)] hover:bg-white/10 
                         transition-all duration-300 flex flex-col items-center"
            >
              {/* ===== Floating Orbit Animation ===== */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={220}
                  height={220}
                  className="mx-auto mb-6 drop-shadow-[0_0_25px_rgba(255,0,255,0.5)]"
                />
              </motion.div>

              {/* ===== Text ===== */}
              <h3 className="text-white text-2xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300 text-[15px] leading-relaxed text-center">
                {item.desc}
              </p>

              {/* ===== Glowing Orb Effect ===== */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 blur-sm"
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* ===== CTA Button ===== */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#F7544B] to-[#590B90] text-white font-semibold 
                       px-10 py-5 text-lg rounded-full shadow-lg 
                       hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] transition-all duration-300"
          >
            Start Your OrbitOS Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
