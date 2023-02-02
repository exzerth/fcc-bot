import clientPromise from "../../lib/mongodb"

//To set fixtures
const handler = async (req: any, res: any) => {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")
    const groupedTeams = await db.collection("GroupedTeams").find({}).toArray()

    const homeAway = (team1: any, team2: any) => {
      return [
        { home: team1, away: team2 },
        { home: team2, away: team1 },
      ]
    }

    let matchups = []
    groupedTeams.forEach((group: { group: any[] }) => {
      let teams = group.group.map((team: any) => team.TeamName)
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matchups.push(homeAway(teams[i], teams[j]))
        }
      }
    })
    await db.collection("Fxtures").insertOne({ matchups })

    res.status(201).send({ Message: "Fixtures Set" })
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`)
    res.status(500).send({ Error: "Error setting fixtures" })
  }
}

export default handler
