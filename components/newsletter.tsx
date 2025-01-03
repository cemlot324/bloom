"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Floating Icons */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${5 + i}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.5}s`
          }}
        >
          <Image
            src="/icon1.png"
            alt="Flower icon"
            width={30}
            height={30}
            className="opacity-10"
          />
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Be the first to know about new collections and exclusive offers
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 text-lg max-w-md border-gray-200 focus:ring-red-500 focus:border-red-500 text-center"
            />
            <Button 
              type="submit"
              variant="outline"
              className="h-20 px-16 text-2xl font-medium text-red-500 border-red-500 hover:bg-red-50 
                transform hover:scale-105 transition-all duration-300 rounded-xl
                hover:border-red-600 hover:text-red-600"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

