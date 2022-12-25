import clientPromise from "../../lib/mongodb";

//to add to db, but still in works
const oneVsOne = (group) => {
  let matches = [];
  for (let i = 0; i < group.length; i++) {
    for (let j = i + 1; j < group.length; j++) {
      matches.push({
        team1: group[i].TeamName,
        team2: group[j].TeamName,
      });
    }
  }
  return matches;
};

const match = async () => {
  const client = await clientPromise;
  const db = client.db("fpldata");
  const groupedTeams = await db.collection("GroupedTeams").find({}).toArray();
  groupedTeams.forEach(async (group) => {
    let matches = oneVsOne(group["group"]);
    await db.collection("MatchUps").insertMany(matches);
  });
  res.status(201).send({ Message: "Teams Matched" });
};

export default match;
