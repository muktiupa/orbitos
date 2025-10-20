"use client";
import { useState, useEffect } from "react";
import {Clock , Settings, Menu } from "lucide-react";
import Orbitoslogo from '../public/orbitoslogo.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // optional scroll effect (shadow on scroll)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-teal-500/10" : ""
      }`}
    >
      <div className="bg-[#131823] border border-gray-700/40 rounded-2xl px-4 md:px-8 py-6 mt-4 mx-auto max-w-6xl flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div className=" w-40 flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <img src={Orbitoslogo.src} alt="Logo" className="" />
        </div>
        </div>
        {/* Middle: Links (Desktop) */}
        <div className="hidden md:flex space-x-6 text-2xl text-gray-300">
          <a href="#" className="hover:text-teal-400">Services</a>
          <span className="text-gray-500">•</span>
          <a href="#" className="hover:text-teal-400">Case Studies</a>
          <span className="text-gray-500">•</span>
          <a href="#" className="hover:text-teal-400">About Us</a>
        </div>

        {/* Right: Icons */}
        <div className="hidden md:flex items-center space-x-5 text-gray-300">
          <div className="border-l border-gray-700 pl-9 flex items-center space-x-2 hover:text-teal-400 cursor-pointer text-2xl">
          <Clock  /><span className="ml-2 ">Schedule a meeting</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#131823] border border-gray-700/40 rounded-xl mx-4 mt-2 p-4 space-y-3 text-gray-300">
          <a href="#" className="block hover:text-teal-400">Services</a>
          <a href="#" className="block hover:text-teal-400">Case Studies</a>
          <a href="#" className="block hover:text-teal-400">About Us</a>
          <a href="#" className="block hover:text-teal-400">Contact</a>
        </div>
      )}
    </nav>
  );
}
