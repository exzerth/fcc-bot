import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")

    const fixtures = await db.collection("Fxtures").find({}).toArray()

    return NextResponse.json(fixtures)
  } catch (error) {
    console.error(error)
  }
}
