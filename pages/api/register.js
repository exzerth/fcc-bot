import clientPromise from "../../lib/mongodb";

const handler = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const teams = await db.collection("Teams");

    //data of body is sent from the register pages to this register api
    await teams.insertOne(req.body);

    res.status(201).send({ Message: "Team Registered" });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

export default handler;
