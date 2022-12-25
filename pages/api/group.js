import clientPromise from "../../lib/mongodb";
import groupArray from "group-array";

const handler = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");
    const teams = await db.collection("Teams");
    const groupedTeams = await db.collection("GroupedTeams");
    await groupedTeams.drop();

    //create team array from team collection
    const teamsArr = await teams.find({}).toArray();

    //group team array by the group property in each team object
    let grouped = groupArray(teamsArr, "group");
    //insert grouped data into the grouped teams collection
    for (const group in grouped) {
      await groupedTeams.insertOne({ group: grouped[group] });
    }

    res.status(201).send({ Message: "Teams Grouped" });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    res.status(500).send({ Error: "Error grouping teams" });
  }
};

export default handler;
