'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

import {
  Plus,
  Paperclip,
  Mic,
  Send,
} from 'lucide-react'

type Message = {
  id: number
  sender: 'user' | 'genpod'
  text: string
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.text }),
      })

      const data = await res.json()

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: 'genpod',
        text: data.reply || '[No reply]',
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error('Gemini error:', err)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'genpod',
          text: '⚠️ Genpod failed to respond.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-xl px-4 py-2 whitespace-pre-line break-words ${
              msg.sender === 'user'
                ? 'ml-auto bg-blue-100 text-blue-800 w-fit max-w-[70%] text-right'
                : 'mr-auto bg-gray-100 text-gray-800 w-full max-w-[100%]'
            }`}
          >
            {msg.sender === 'genpod' ? (
              <ReactMarkdown
                children={msg.text}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: ({ node, children }) => {
                    // Avoid wrapping <p> around <pre> (which is invalid HTML)
                    if (
                      node.children &&
                      node.children[0] &&
                      node.children[0].tagName === 'pre'
                    ) {
                      return <>{children}</>
                    }
                  
                    return <p className="mb-2 text-sm">{children}</p>
                  },
                  code: ({ node, inline, className, children, ...props }) =>
                    inline ? (
                      <code className="bg-gray-200 px-1 rounded text-sm">{children}</code>
                    ) : (
                      <pre className="bg-gray-800 text-white p-3 rounded text-sm overflow-auto">
                        <code {...props}>{children}</code>
                      </pre>
                    ),
                  li: ({ children }) => <li className="ml-4 list-disc text-sm">{children}</li>,
                }}
              />
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Spinner while Genpod is thinking */}
        {isLoading && (
          <div className="mr-auto flex items-center gap-2 px-2 py-1 text-sm text-gray-500">
            <svg
              className="animate-spin h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Genpod is thinking...
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="bg-white p-3 shadow-sm">
        <div className="rounded-2xl border bg-gray-50 px-4 py-3 shadow-sm w-full">
          {/* Input Field */}
          <input
            type="text"
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 outline-none"
            placeholder="Message Genpod..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          {/* Bottom Row – Icons + Send */}
          <div className="flex items-center justify-between mt-3">
            {/* Left Icons */}
            <div className="flex items-center gap-4 text-gray-600">
              <button className="hover:text-blue-500 hover:scale-110 transition" title="More">
                <Plus size={18} />
              </button>

              <label
                className="cursor-pointer hover:text-blue-500 hover:scale-110 transition"
                title="Attach File"
              >
                <Paperclip size={18} />
                <input type="file" className="hidden" />
              </label>

              <button className="hover:text-blue-500 hover:scale-110 transition" title="Voice">
                <Mic size={18} />
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 transition text-white"
              title="Send"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}