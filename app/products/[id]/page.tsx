import { ProductView } from "@/components/product-view"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { notFound } from "next/navigation"
// import { getBaseUrl } from "@/lib/utils"

// Define the Product type to match your MongoDB schema
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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const db = await connectToDatabase()
    const product = await db.collection("products").findOne({ 
      _id: new ObjectId(id) 
    })
    
    if (!product) {
      return null
    }

    // Transform the MongoDB document to match our Product type
    return {
      ...product,
      _id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      images: product.images,
      category: product.category,
      features: product.features || [],
      ingredients: product.ingredients || []
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return <ProductView product={product} />
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id)
    
    if (!product) {
      return {
        title: 'Product - Bloom',
        description: 'Product details',
      }
    }

    return {
      title: `${product.title} - Bloom`,
      description: product.description,
    }
  } catch {
    return {
      title: 'Product - Bloom',
      description: 'Product details',
    }
  }
} 