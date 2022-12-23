import clientPromise from "../../lib/mongodb";

const handler = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const teams = await db.collection("Teams");

    await teams.insertOne(req.body);

    res.status(201).send({ Message: "Team inserted" });
  } catch (e) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

export default handler;
