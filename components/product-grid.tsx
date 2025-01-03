'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { 
  Loader2, 
  Search, 
  Apple, 
  Brain, 
  Heart, 
  Leaf, 
  Grid2x2 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Product {
  _id: string
  title: string
  description: string
  price: number
  images: string[]
  category: string
}

const gradientColors = [
  'from-white to-pink-100',
  'from-white to-blue-100',
  'from-white to-purple-100',
  'from-white to-green-100',
  'from-white to-yellow-100',
  'from-white to-orange-100',
]

const categoryIcons = {
  "All": <Grid2x2 className="h-4 w-4" />,
  "Fruity": <Apple className="h-4 w-4" />,
  "Brain": <Brain className="h-4 w-4" />,
  "Health": <Heart className="h-4 w-4" />,
  "Natural": <Leaf className="h-4 w-4" />,
}

export function ProductGrid() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        setError('Error loading products')
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = ["All", ...new Set(products.map(product => product.category))]

  const filteredProducts = products.filter(product => {
    const matchesFilter = activeFilter === "All" || product.category === activeFilter
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-500">
        {error}
      </div>
    )
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "ghost"}
                onClick={() => setActiveFilter(category)}
                className={`
                  flex items-center gap-2 px-4 py-2
                  ${activeFilter === category ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-100'}
                `}
              >
                {categoryIcons[category as keyof typeof categoryIcons]}
                <span className="text-sm">{category}</span>
              </Button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 border-gray-200 focus:ring-red-500 focus:border-red-500"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className={`
                rounded-lg overflow-hidden
                bg-gradient-to-b ${gradientColors[index % gradientColors.length]}
                transition-transform duration-300 hover:scale-[1.02]
                shadow-sm hover:shadow-md
                w-full max-w-[240px] mx-auto
                cursor-pointer
              `}
            >
              <div className="aspect-[3/2] relative">
                <Image
                  src={product.images[0] || '/placeholder.png'}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              
              <div className="p-2">
                <h3 className="font-medium text-sm mb-1.5 line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">
                    {product.category}
                  </span>
                  <span className="font-bold text-xs text-red-500">
                    £{product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

