'use client'

import { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Send, Settings2, X } from 'lucide-react'

export default function GeminiChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [aiConfig, setAiConfig] = useState({
    name: 'Nitro AI',
    tone: 'friendly and helpful',
    style:
      'clear, simple, and human-like HTML with headings, subheadings, bold, italic, and paragraph. Use white for headings, off-white for paragraphs, and orange for highlights. Avoid JS, only inline CSS.',
    role:
      'AI Marketing Expert Assistant. Must reply in pure HTML format with inline styling that can be rendered inside the chat.',
  })

  const chatEndRef = useRef(null)

  // 🧠 Load previous chat from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('nitro_chat_history')
    if (saved) setMessages(JSON.parse(saved))
  }, [])

  // 💾 Save chat to sessionStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('nitro_chat_history', JSON.stringify(messages))
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ✉️ Handle sending message
  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', text: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          { role: 'ai', html: '<p style="color:red;">⚠️ Missing Gemini API key.</p>' },
        ])
        setLoading(false)
        return
      }

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

      // 🧩 Build conversation context for continuity
      const history = newMessages
        .map((m) => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text || m.html}`)
        .join('\n')

      const prompt = `
You are ${aiConfig.name}, a ${aiConfig.role}.
Tone: ${aiConfig.tone}.
Style: ${aiConfig.style}.
This is the ongoing conversation so far:
${history}

Now respond in pure HTML only (no markdown, no code blocks).
User: "${input}"
      `

      const result = await model.generateContent(prompt)
      let html = (await result.response.text()).trim()
      html = html.replace(/```html|```/g, '').trim()

      setMessages((prev) => [...prev, { role: 'ai', html }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        { role: 'ai', html: '<p style="color:red;">⚠️ Error connecting to Gemini.</p>' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) handleSend()
  }

  // ⚙️ Handle AI Config JSON input
  const handleConfigChange = (e) => {
    try {
      const updated = JSON.parse(e.target.value)
      setAiConfig(updated)
    } catch {
      // ignore invalid JSON while typing
    }
  }

  // 🧹 Clear chat
  const handleClearChat = () => {
    setMessages([])
    sessionStorage.removeItem('nitro_chat_history')
  }

  return (
    <div className="h-screen w-screen bg-[#131314] text-white flex flex-col justify-between">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center text-gray-300 border-b border-[#1E1F20]">
        <h1 className="text-xl font-semibold">
          nitro<span className="text-blue-400">AI</span>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleClearChat}
            className="text-sm text-gray-400 hover:text-red-400 transition"
          >
            Clear Chat
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="hover:text-blue-400 transition"
          >
            <Settings2 size={22} />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-6 bg-[#1E1F20] border border-gray-700 p-4 rounded-2xl w-96 z-50 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-200">AI Configuration (JSON)</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-red-400"
            >
              <X size={20} />
            </button>
          </div>
          <textarea
            defaultValue={JSON.stringify(aiConfig, null, 2)}
            onChange={handleConfigChange}
            className="w-full h-48 bg-black text-gray-200 font-mono text-sm rounded-lg p-2 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
          ></textarea>
          <p className="text-gray-500 text-xs mt-1">
            Edit and save JSON to customize AI’s tone and response format.
          </p>
        </div>
      )}

      {/* Chat Section */}
      <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <h1 className="text-4xl font-light text-gray-200">Hello, Mukti 👋</h1>
            <p className="text-lg text-gray-500">
              Ask me anything about marketing or edit AI settings ⚙️
            </p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-black'
                    : 'bg-[#1E1F20] border border-gray-700 text-gray-100'
                }`}
              >
                {msg.role === 'ai' ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.html }}
                    className="prose prose-invert max-w-none"
                  ></div>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            </div>
          ))
        )}
        {loading && <p className="text-gray-400 text-sm animate-pulse">Thinking...</p>}
        <div ref={chatEndRef} />
      </main>

      {/* Input Bar */}
      <footer className="px-6 pb-6 flex flex-col items-center">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
            className="w-full bg-[#1E1F20] text-white placeholder-gray-400 rounded-full py-4 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-400 text-black p-2 rounded-full transition"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-3">Powered by OrbitOS Nitro v01.00 </p>
      </footer>
    </div>
  )
}
