"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Minus, Plus, Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/context/cart-context"
import { toast } from "sonner"

interface Product {
  _id: string
  title: string
  description: string
  price: number
  images: string[]
  category: string
  features?: string[]
  ingredients?: string[]
}

interface ProductViewProps {
  product: Product
}

export function ProductView({ product }: ProductViewProps) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    })
    toast.success("Added to cart")
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : prev))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : prev))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-20 aspect-square rounded-lg overflow-hidden flex-shrink-0",
                    selectedImage === index && "ring-2 ring-red-500"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
              <p className="text-2xl font-medium text-red-500">£{product.price.toFixed(2)}</p>
            </div>

            <div className="prose prose-gray max-w-none">
              <p>{product.description}</p>
            </div>

            {product.features && (
              <div>
                <h3 className="text-lg font-medium mb-4">Key Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.ingredients && (
              <div>
                <h3 className="text-lg font-medium mb-4">Ingredients</h3>
                <p className="text-gray-600">{product.ingredients.join(', ')}</p>
              </div>
            )}

            <div className="flex items-center gap-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button 
                variant="outline"
                className="flex-1 h-12 text-red-500 border-red-500 hover:bg-red-50 
                  hover:text-red-600 hover:border-red-600 transition-colors"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 border-gray-200"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <div className="border-t pt-8">
              <p className="text-sm text-gray-500">
                Category: <span className="text-gray-900">{product.category}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 