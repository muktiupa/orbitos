"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageDownIcon } from "lucide-react";

const team = [
  {
    name: "Manas",
    role: "The Growth Architect",
    description:
      "He doesn’t just run campaigns — he engineers performance ecosystems. With data, AI, and creativity in sync, Manas designs growth that compounds.",
    image: "/assets/manas.png",
    gradient: "from-[#4B0082] to-[#2E0854]",
  },
  {
    name: "Mukti",
    role: "The Digital & Tech Alchemist",
    description:
      "Turning code into seamless experiences, Mukti builds the systems that power OrbitOS — where automation, design, and intelligence converge.",
    image: "/assets/mukti.png",
    gradient: "from-[#FF512F] to-[#DD2476]",
  },
  {
    name: "Arup",
    role: "Automation Architect",
    description:
      "Arup automates the impossible — connecting platforms, data, and AI workflows into one frictionless machine built for 24/7 performance.",
    image: "/assets/arup.png",
    gradient: "from-[#FF8008] to-[#FFC837]",
  },
];

export default function AboutTeam() {
  return (
    <section className="relative bg-black text-white py-20 px-6 md:px-12 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          About OrbitOS <span className="text-gray-400 text-lg">(The Team)</span>
        </h2>
        <p className="text-xl text-gray-300 font-semibold mb-6">
          Where Human Creativity Meets AI Precision
        </p>
        <p className="text-gray-400 leading-relaxed">
          At OrbitOS, we fuse human insight with machine intelligence to create
          marketing systems that think, learn, and scale on their own. Our
          mission is simple — to make automation accessible, effective, and
          exciting for every brand that dares to grow beyond limits.
        </p>
      </div>

      {/* Team Members */}
      <div className="space-y-10 max-w-4xl mx-auto">
        {team.map((person, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row items-center md:items-end rounded-3xl p-8 md:p-10 bg-gradient-to-r ${person.gradient} shadow-[0_0_35px_rgba(0,0,0,0.5)]`}
          >
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg md:text-xl text-gray-200 font-semibold mb-1">
                {person.role}
              </h3>
              <h4 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-3">
                {person.name}
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                {person.description}
              </p>
            </div>

            {/* Image slightly outside the card */}
            <div className="relative mt-6 md:mt-0 md:-mr-8 flex-shrink-0 w-36 h-30 md:w-44 md:h-30">
              <Image
                src={person.image}
                alt={person.name}
                width={250}
                height={350}
                className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
                style={{ transform: "translate(25px, -85px)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-16">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-full bg-gradient-to-r from-[#F7544B] to-[#590B90] text-white shadow-lg hover:shadow-[0_0_25px_rgba(247,84,75,0.6)] transition-all"
        >
          Book Your Strategy Call with Us
        </motion.a>
      </div>
    </section>
  );
}
