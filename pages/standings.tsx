import clientPromise from "../lib/mongodb"
import Standings from "../components/Standings"
import Link from "next/link"

const standings = ({ groupedTeams }) => {
  return (
    <>
      <Standings groupedTeams={groupedTeams} />
      <div className="flex justify-center gap-7 mt-[20px] text-[blue]">
        <Link href="/">Register</Link>
        <Link href="/teams">Teams</Link>
        <Link href="/fixtures">Fixtures</Link>
      </div>
    </>
  )
}

export async function getServerSideProps({ props }) {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")

    const groupedTeams = await db.collection("GroupedTeams").find({}).toArray()

    return {
      props: { groupedTeams: JSON.parse(JSON.stringify(groupedTeams)) },
    }
  } catch (error) {
    console.error(error)
  }
}

export default standings
