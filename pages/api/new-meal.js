import clientPromise from "../../lib/mongodb";

const handler = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const teams = await db.collection("Teams");

    await teams.insertOne(req.body);

    res.status(201).send({ Message: "Meal inserted" });
  } catch (e) {
    console.error(e);
  }
};

export default handler;
