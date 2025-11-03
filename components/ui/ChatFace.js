"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mouthShapes from "./lipsyncData.json";

// ✅ Gemini setup (make sure .env.local has NEXT_PUBLIC_GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function ChatFace() {
  const [input, setInput] = useState("");
  const [mouth, setMouth] = useState(mouthShapes.neutral);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const leftEyeCtrl = useAnimation();
  const rightEyeCtrl = useAnimation();

  // 👁 Eye blinking
  useEffect(() => {
    const blinkLoop = setInterval(async () => {
      await leftEyeCtrl.start({ scaleY: 0.1, transition: { duration: 0.08 } });
      await rightEyeCtrl.start({ scaleY: 0.1, transition: { duration: 0.08 } });
      await leftEyeCtrl.start({ scaleY: 1, transition: { duration: 0.12 } });
      await rightEyeCtrl.start({ scaleY: 1, transition: { duration: 0.12 } });
    }, 2800);
    return () => clearInterval(blinkLoop);
  }, [leftEyeCtrl, rightEyeCtrl]);

  // 🔊 Speak function
  function speak(text) {
    if (!soundOn || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  // 👄 Lipsync animation
  async function animateSpeech(text) {
    const letters = text.toUpperCase().split("");
    for (let i = 0; i < letters.length; i++) {
      const ch = letters[i];
      const nextShape =
        mouthShapes[ch] ||
        (/[AEIOU]/.test(ch) ? mouthShapes["A"] : mouthShapes["neutral"]);

      setMouth(nextShape);
      await new Promise((r) => setTimeout(r, 85));
    }
    setMouth(mouthShapes.neutral);
  }

  // 🧠 Gemini Chat
  const sendToGemini = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(input);
      const text = result.response.text();

      setResponse(text);
      animateSpeech(text);
      speak(text);
    } catch (e) {
      console.error("Gemini Error:", e);
      setResponse("⚠️ Gemini connection error.");
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-amber-100 text-gray-800 p-4">
      {/* 🎨 Face Center */}
      <div className="flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 100 70"
          width="280"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Face background */}
          <ellipse cx="50" cy="35" rx="48" ry="30" fill="#fff9e6" />
          {/* Blush */}
          <g opacity="0.9">
            <ellipse cx="30" cy="44" rx="6" ry="3.6" fill="#ffd6a6" />
            <ellipse cx="70" cy="44" rx="6" ry="3.6" fill="#ffd6a6" />
          </g>

          {/* Eyes */}
          <g>
            <ellipse
              cx="30"
              cy="28"
              rx="11"
              ry="12"
              fill="#fff"
              stroke="#1f1b2e"
              strokeWidth="1.5"
            />
            <motion.g style={{ originY: "50%" }} animate={leftEyeCtrl}>
              <ellipse cx="30" cy="28" rx="7" ry="8" fill="#17142b" />
              <ellipse cx="27" cy="25" rx="2" ry="2" fill="#fff" opacity="0.9" />
            </motion.g>
          </g>

          <g>
            <ellipse
              cx="70"
              cy="28"
              rx="11"
              ry="12"
              fill="#fff"
              stroke="#1f1b2e"
              strokeWidth="1.5"
            />
            <motion.g style={{ originY: "50%" }} animate={rightEyeCtrl}>
              <ellipse cx="70" cy="28" rx="7" ry="8" fill="#17142b" />
              <ellipse cx="67" cy="25" rx="2" ry="2" fill="#fff" opacity="0.9" />
            </motion.g>
          </g>

          {/* 👄 Lips */}
          <g>
            <motion.path
              d={mouth.upper}
              stroke="#1f1b2e"
              strokeWidth="1.6"
              fill="none"
              animate={{ d: mouth.upper }}
              transition={{ duration: 0.12, ease: "easeInOut" }}
            />
            <motion.path
              d={mouth.lower}
              stroke="#1f1b2e"
              strokeWidth="1.6"
              fill="none"
              animate={{ d: mouth.lower }}
              transition={{ duration: 0.12, ease: "easeInOut" }}
            />
          </g>
        </svg>

        {/* 💬 Chat Bubble */}
        <div className="bg-white/90 rounded-2xl shadow-md mt-6 p-4 w-72 text-center min-h-[60px]">
          {loading ? "🤔 Thinking..." : response || "👋 Hi! I’m your Gemini friend."}
        </div>

        {/* 🔊 Sound Toggle */}
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="mt-2 px-3 py-1 bg-amber-200 rounded-lg text-sm hover:bg-amber-300"
        >
          {soundOn ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </button>

        {/* 📝 Input */}
        <div className="flex gap-2 mt-4 w-72">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendToGemini()}
          />
          <button
            onClick={sendToGemini}
            className="px-4 py-2 bg-amber-500 text-white rounded-xl shadow hover:bg-amber-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
