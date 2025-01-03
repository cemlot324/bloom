import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectToDatabase()
    const collection = db.collection("products")
    
    const product = await collection.findOne({ 
      _id: new ObjectId(String(params.id))
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" }, 
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch product" }, 
      { status: 500 }
    )
  }
} 