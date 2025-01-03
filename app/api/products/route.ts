import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("Attempting database connection...")
    const db = await connectToDatabase()
    
    console.log("Getting products collection...")
    const collection = db.collection("products")
    
    console.log("Fetching products...")
    const products = await collection.find({}).toArray()
    
    console.log(`Found ${products.length} products`)
    return NextResponse.json(products)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ 
      error: "Failed to fetch products",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const db = await connectToDatabase()
    const collection = db.collection("products")
    
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    })

    return NextResponse.json({ 
      message: "Product created successfully",
      productId: result.insertedId 
    })
  } catch (error) {
    console.error("Error creating product:", error)
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return NextResponse.json(
      { error: "Failed to create product", details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
} 