import Link from "next/link"
import React from "react"
import Fixtures from "../components/Fixtures"
import clientPromise from "../lib/mongodb"

/* To display fixtures only */
const Matchup = ({ fixtures }) => {
  return (
    <>
      <Fixtures fixtures={fixtures} />
      <div className="flex justify-center gap-7 mt-[20px] text-[blue]">
        <Link href="/">Register</Link>
        <Link href="/standings">Standings</Link>
        <Link href="/teams">Teams</Link>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")

    const fixtures = await db.collection("Fxtures").find({}).toArray()

    return {
      props: { fixtures: JSON.parse(JSON.stringify(fixtures)) },
    }
  } catch (error) {
    console.error(error)
  }
}

export default Matchup
