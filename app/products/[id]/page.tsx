import { notFound } from "next/navigation"
import { getProductById } from "@/lib/actions"
import { ProductView } from "@/components/product-view"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ 
  params 
}: ProductPageProps) {
  try {
    const product = await getProductById(String(params.id))

    if (!product) {
      notFound()
    }

    return <ProductView product={product} />
  } catch (error) {
    console.error("Error:", error)
    notFound()
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const product = await getProductById(String(params.id))
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