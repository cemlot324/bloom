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

    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }])
    setMessage("")
    setHasNewMessage(false)

    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          text: "Thank you for your message. How else can I help you?", 
          isUser: false 
        }
      ])
      setHasNewMessage(!isOpen)

      // Show browser notification if chat is minimized
      if (!isOpen && "Notification" in window && Notification.permission === "granted") {
        new Notification("New Message", {
          body: "You have a new message from the assistant",
          icon: "/icon.png" // Add your icon path
        })
      }
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
          setHasNewMessage(false)
        }}
        variant="outline"
        size="icon"
        className={cn(
          "relative h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-100",
          isOpen && "bg-red-500 text-white hover:bg-red-600"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {hasNewMessage && (
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            )}
          </>
        )}
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "absolute bottom-16 right-0 w-80 rounded-lg bg-white shadow-lg transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
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