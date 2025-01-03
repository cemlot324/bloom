const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      cache: 'no-store' // Disable cache to ensure fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    
    return response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
} 