import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await connectToDatabase()
    const collection = db.collection("products")
    const products = await collection.find({}).toArray()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
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
    return NextResponse.json(
      { error: "Failed to create product" }, 
      { status: 500 }
    )
  }
} 