"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Thank you for your order!</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          We've received your order and will send you a confirmation email shortly.
        </p>
        <Link href="/">
          <Button
            variant="outline"
            className="text-red-500 border-red-500 hover:bg-red-50 
              hover:text-red-600 hover:border-red-600 transition-colors"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
} 