import clientPromise from "../../lib/mongodb"

//To group teams
const handler = async (req: any, res: any) => {
  try {
    const client = await clientPromise
    const db = client.db("fpldata")
    const fixtures = await db.collection("Fxtures").find({}).toArray()

    const matchup = fixtures[0].matchups

    const reducedMatchup = matchup.reduce(
      (acc, curr, index) => {
        if (index < 6) {
          acc[0].push(curr)
        } else if (index == 6 || index < 12) {
          acc[1].push(curr)
        } else if (index == 12 || index < 18) {
          acc[2].push(curr)
        } else if (index == 18 || index < 24) {
          acc[3].push(curr)
        }
        return acc
      },
      [[], [], [], []]
    )

    const groupA = reducedMatchup[0].flat(Infinity)
    const groupB = reducedMatchup[1].flat(Infinity)
    const groupC = reducedMatchup[2].flat(Infinity)
    const groupD = reducedMatchup[3].flat(Infinity)

    const gameweeks = {
      GroupA: groupA,
      GroupB: groupB,
      GroupC: groupC,
      GroupD: groupD,
    }

    const gameweekOne = {
      1: [gameweeks.GroupA[0].home, gameweeks.GroupA[10].away],
      2: [gameweeks.GroupA[7].home, gameweeks.GroupA[7].away],
      3: [gameweeks.GroupB[0].home, gameweeks.GroupB[10].away],
      4: [gameweeks.GroupB[7].home, gameweeks.GroupB[7].away],
    }

    const gameweekTwo = {
      1: [gameweeks.GroupA[1].home, gameweeks.GroupA[11].away],
      2: [gameweeks.GroupA[8].home, gameweeks.GroupA[8].away],
      3: [gameweeks.GroupB[1].home, gameweeks.GroupB[11].away],
      4: [gameweeks.GroupB[8].home, gameweeks.GroupB[8].away],
    }

    await db
      .collection("Gameweeks")
      .insertMany([{ gameweekOne }, { gameweekTwo }])
    //res.send(gameweekOne);
    res.status(201).send({ Message: "Gameweeks Set" })
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`)
    res.status(500).send({ Error: "Error setting Gameweeks" })
  }
}

export default handler
