/* import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const teams = await db.collection("Teams").find({}).toArray();

    res.json(teams);
  } catch (e) {
    console.error(e);
  }
}; */
