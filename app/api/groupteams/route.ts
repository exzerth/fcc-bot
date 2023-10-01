import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import groupArray from "group-array"

export async function PUT() {
  //TODO: Add P,W,D,L,TS to teams upon grouping
  try {
    const client = await clientPromise
    const db = client.db("fccdata")

    const teams = db.collection("Teams")
    const groupedTeams = db.collection("GroupedTeams")

    // Check if the 'groupedTeams' collection exists before dropping it
    const collections = await db
      .listCollections({ name: "GroupedTeams" })
      .toArray()
    if (collections.length > 0) {
      // 'groupedTeams' collection exists, so drop it
      await groupedTeams.drop()
    }

    // Create a team array from the 'teams' collection
    const teamsArr = await teams.find({}).toArray()

    // Group the team array by the 'group' property in each team object
    let grouped: any = groupArray(teamsArr, "group")

    // Insert grouped data into the 'groupedTeams' collection
    for (const group in grouped) {
      await groupedTeams.insertOne({ group: grouped[group] })
    }

    return NextResponse.json(
      { message: "Group Identifier Added" },
      { status: 201 }
    )
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`)
  }
}
