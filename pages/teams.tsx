/* Homepage
cuyrrently displays the registered teams */
import clientPromise from "../lib/mongodb"
import Link from "next/link"
import Teams from "../components/Teams"

const HomePage = ({ teams }) => {
  return (
    <>
      <Teams teams={teams} />
      <div className="flex justify-center gap-7 mt-[20px] text-[blue]">
        <Link href="/">Register</Link>
        <Link href="/standings">Standings</Link>
        <Link href="/fixtures">Fixtures</Link>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")

    const teams = await db.collection("Teams").find({}).toArray()

    return {
      props: { teams: JSON.parse(JSON.stringify(teams)) },
    }
  } catch (error) {
    console.error(error)
  }
}

export default HomePage
