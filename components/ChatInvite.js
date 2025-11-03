"use client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
export default function ChatInvite() {
  return (
    <div className="absolute top-50 right-0 bg-[#111827] text-gray-200 border border-blue-500/50 rounded-2xl p-5 w-[280px] md:w-[320px] shadow-lg">
      <div className="mb-4 h-10">
      <p className="typewriter text-sm leading-relaxed mb-4">
        Hi, I’m <span className="text-blue-400 font-medium">Netro</span> — your AI marketing assistant.
        </p>
</div>

      <Link href="/chatNitroAi" className="w-full flex items-center justify-center space-x-2  bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-all hover:scale-110 transition-transform duration-300">
        <MessageCircle size={18} />
        <span className="font-medium ">Let’s chat!</span>
      </Link>

      <Link href="/grumpy" className="w-full flex items-center justify-center space-x-2  mt-3.5 bg-amber-50 hover:bg-amber-200 text-gray-800 py-2.5 rounded-xl transition-all hover:scale-110 transition-transform duration-300">
        <MessageCircle size={18} />
        <span className="font-medium"> Talk to Grumpy</span>
      </Link>

      {/* Inline CSS animation */}
      <style jsx>{`
        .typewriter {
          overflow: hidden;
          border-right: 2px solid white;
          white-space: nowrap;
        animation: typing 5s steps(60) infinite, blink 0.7s step-end infinite;
        }

        @keyframes typing {
          0% { width: 0ch; }
          50% { width: 35ch; }
          100% { width: 100%; }
        }

        @keyframes blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: white; }
        }
      `}</style>
    </div>
  );
}
