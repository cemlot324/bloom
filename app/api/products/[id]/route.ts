import { NextResponse, NextRequest } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectToDatabase()
    const collection = db.collection("products")
    
    const product = await collection.findOne({ 
      _id: new ObjectId(params.id)
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

// Add DELETE method if needed
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectToDatabase()
    const collection = db.collection("products")
    
    const result = await collection.deleteOne({ 
      _id: new ObjectId(String(params.id))
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Product not found" }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json(
      { error: "Failed to delete product" }, 
      { status: 500 }
    )
  }
} 