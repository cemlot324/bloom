import { ProductView } from "@/components/product-view"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { notFound } from "next/navigation"
import { getBaseUrl } from "@/lib/utils"

async function getProduct(id: string) {
  try {
    // Use direct database connection instead of API route for server components
    const db = await connectToDatabase()
    const product = await db.collection("products").findOne({ 
      _id: new ObjectId(id) 
    })
    
    if (!product) {
      return null
    }

    return {
      ...product,
      _id: product._id.toString()
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