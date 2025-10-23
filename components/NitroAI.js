'use client'

import { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Clock } from 'lucide-react'

export default function NitroChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const aiConfig = {
    name: 'Nitro AI',
    gole:"gole is to provide best marketing plane to user",
    tone: 'friendly',
    goal:
      'Generate a complete HTML + TailwindCSS ui not websit its a ui of the plane text must be white or light color  (with inline JS if needed) that visually explains the user’s request like a modern landing page. Must be visually rich and self-contained. Avoid external assets except TailwindCDN.',
    example:
      'If asked "explain marketing strategy", return a mini webpage with headings, colored sections, icons, and step cards explaining the process.',
    rules: `
      - Use valid HTML5.
      - Use TailwindCSS via CDN in <head>.
      - Use inline <script> if logic is needed.
      - No markdown or JSX.
      - Make it modern, full-screen responsive.
      - Include emojis and color variations.
      - dont use any image tags.
      - if you use cta cta must link to /meetingscheduling
      - text color must be in shades of white  Very important 
      - background color must be in shades of dark colors
      -headings must be in shades of cyan or blue text-amber-50
      - dont creat any navigacation bars or footers
    `,
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          { role: 'ai', html: '<p>⚠️ Missing Gemini API Key.</p>' },
        ])
        setLoading(false)
        return
      }

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

      const prompt = `
You are ${aiConfig.name}.
${aiConfig.goal}

Strict rules:
${aiConfig.rules}

User request:
"${input}"

Output only the HTML code of the generated webpage.
      `

      const result = await model.generateContent(prompt)
      let html = (await result.response.text()).trim()
      html = html.replace(/```html|```/g, '').trim()

      setMessages((prev) => [...prev, { role: 'ai', html }])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        { role: 'ai', html: '<p>⚠️ Error: Unable to connect to Gemini.</p>' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) handleSend()
  }

  return (
    <div className="bg-black text-gray-100 min-h-screen min-w-screen pl-40 pr-40 pb-10 flex flex-col">
      {/* HEADER */}
      <header className="py-4 px-6 text-center text-cyan-400 font-semibold text-lg border-b border-cyan-900/40 shadow-[0_0_15px_#00ffff44] sticky top-0 z-10 bg-[#0a0a15]/90 backdrop-blur-lg">
        ⚡ Nitro AI — you ai power marketing co-pilot
      </header>

      {/* CHAT AREA */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`w-full rounded-2xl overflow-hidden ${
                msg.role === 'user'
                  ? 'bg-cyan-500/90 text-black p-4'
                  : 'bg-[#0d0d20]/90 border border-cyan-800/40'
              }`}
            >
              {msg.role === 'ai' ? (
                <iframe
                  sandbox="allow-scripts allow-same-origin"
                  srcDoc={msg.html}
                  className="w-full h-[80vh] rounded-xl border-0 bg-gray-900 text-amber-50"
                ></iframe>
              ) : (
                <p className="p-3">{msg.text}</p>
              )}
            </div>

            {/* {msg.role === 'ai' && (
              <div className="hidden md:flex items-center ml-4 text-gray-300 hover:text-teal-400 cursor-pointer bg-amber-500  text-sm">
                <Clock className="mr-1" /> Schedule a meeting
              </div>
            )} */}
          </div>
        ))}

        {loading && (
          <div className="p-3 rounded-2xl bg-[#151528]/80 border border-cyan-800/40 text-gray-400 text-sm animate-pulse">
            Getting your perfect marketing plane ready...
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* INPUT BAR */}
      <footer className="p-4 border-t border-cyan-900/40 bg-[#0b0b15]/80 backdrop-blur-md sticky bottom-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            className="flex-1 bg-[#141428] border border-cyan-900/40 text-gray-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            placeholder="Ask Nitro AI to design a webpage explaining your idea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              loading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_15px_#00ffffaa]'
            }`}
          >
            {loading ? '...' : 'Generate'}
          </button>
        </div>
      </footer>
    </div>
  )
}
