import clientPromise from "../../lib/mongodb"

const handler = async (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*")

  try {
    const client = await clientPromise
    const db = client.db("fpldata")

    const teams = await db.collection("Teams")

    const addKey = async () => {
      //keys to be added for grouping to work
      let keys = [1, 2, 3, 4]

      // shuffle the keys array using the Fisher-Yates algorithm
      for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[keys[i], keys[j]] = [keys[j], keys[i]]
      }

      let keysIndex = 0
      const teamDocs = await teams.find({}).toArray()
      for (const teamDoc of teamDocs) {
        // shuffle the keys array if the current index in the keys array has reached the end of the array
        if (keysIndex === keys.length) {
          for (let j = keys.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1))
            ;[keys[j], keys[k]] = [keys[k], keys[j]]
          }
          keysIndex = 0
        }

        // update the group property of the current document in the collection using the updateMany() method
        await teams.updateMany(
          { _id: teamDoc._id },
          { $set: { group: keys[keysIndex] } }
        )
        keysIndex++
      }
    }

    await addKey()
    res.status(201).send({ Message: "Group Identifier Added" })
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`)
  }
}

export default handler
