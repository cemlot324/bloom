"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function Assistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [hasNewMessage, setHasNewMessage] = useState(true)
  const [showInitialNotification, setShowInitialNotification] = useState(true)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Welcome to Bloom! How can I assist you today?", isUser: false }
  ])

  // Hide initial notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialNotification(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setMessages(prev => [...prev, { text: message, isUser: true }])
    setHasNewMessage(false)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thank you for your interest! I'm here to help you find the perfect natural beauty products for your needs.",
        isUser: false
      }])
      if (!isOpen) {
        setHasNewMessage(true)
      }
    }, 1000)

    setMessage("")
  }

  // Update hasNewMessage when chat is opened/closed
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(prev => !prev)}
          variant="outline"
          className={cn(
            "rounded-full w-14 h-14 border-2 border-red-500 text-red-500 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300",
            isOpen && "rotate-90 hover:bg-red-50"
          )}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>

        {/* Notification Dot */}
        {!isOpen && (hasNewMessage || showInitialNotification) && (
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}

        {/* Initial Notification Popup */}
        {!isOpen && showInitialNotification && (
          <div className="absolute bottom-full right-0 mb-2 transform transition-all duration-300 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-3 border-2 border-red-100 text-sm w-48">
              <p>Hi! Need help finding the perfect product? 👋</p>
            </div>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r-2 border-b-2 border-red-100"></div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "absolute bottom-20 right-0 w-96 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-red-100 transition-all duration-300 transform",
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="p-4 border-b border-red-100">
          <h3 className="text-lg font-semibold text-gray-900">Bloom Assistant</h3>
          <p className="text-sm text-gray-500">Ask me anything about our products</p>
        </div>

        {/* Messages */}
        <div className="p-4 h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "max-w-[80%] p-3 rounded-xl transition-all duration-300",
                msg.isUser
                  ? "bg-gradient-to-r from-red-500 to-red-400 text-white ml-auto transform hover:scale-[1.02]"
                  : "bg-gradient-to-r from-gray-50 to-white border border-red-100 text-gray-900 transform hover:scale-[1.02]"
              )}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-red-100">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-red-200 focus:ring-red-500 focus:border-red-500 bg-white/80"
            />
            <Button 
              type="submit"
              variant="outline"
              size="icon"
              className="text-red-500 border-red-500 hover:bg-red-50 
                hover:text-red-600 hover:border-red-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 