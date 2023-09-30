import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function POST(request: any) {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")

    const teams = db.collection("Teams")

    const body = await request.json()
    await teams.insertOne(body)

    return NextResponse.json({ message: "Team Registered" }, { status: 201 })
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`)
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")

    const teams = await db.collection("Teams").find({}).toArray()

    return NextResponse.json(teams)
  } catch (error) {
    console.error(error)
  }
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }
