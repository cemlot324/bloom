"use client"

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function Cart() {
  const router = useRouter()
  const { state, removeItem, updateQuantity } = useCart()

  return (
    <SheetContent className="bg-white w-full max-w-md sm:max-w-lg">
      <SheetHeader className="space-y-2.5 pb-6 border-b">
        <SheetTitle className="text-2xl font-semibold text-gray-900">Shopping Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-6">
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-1">Add some products to your cart</p>
          </div>
        ) : (
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item._id} className="flex gap-4 py-4 border-b">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">£{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-1 hover:bg-gray-100 rounded ml-auto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>£{state.total.toFixed(2)}</span>
              </div>
              <Button 
                variant="outline"
                className="w-full mt-4 h-12 text-red-500 border-red-500 hover:bg-red-50 
                  hover:text-red-600 hover:border-red-600 transition-colors"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </SheetContent>
  )
} 