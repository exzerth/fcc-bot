import clientPromise from "../../lib/mongodb";

const handler = async (req, res) => {
  //modify the code such that home and away matchup of each group is saved in an array in their versus mode
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const sortMatchups = (teams) => {
      let sortedTeams = [];
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          sortedTeams.push({
            team1: teams[i].TeamName,
            team2: teams[j].TeamName,
          });
          sortedTeams.push({
            team1: teams[j].TeamName,
            team2: teams[i].TeamName,
          });
        }
      }
      return sortedTeams;
    };

    const client = await clientPromise;
    const db = client.db("fpldata");
    const groups = await db.collection("GroupedTeams").find({}).toArray();

    const sortedGroups = groups.map((group) => {
      return {
        ...group,
        group: sortMatchups(group.group),
      };
    });

    await db.collection("SortedMatchups").insertMany(sortedGroups);
    res.status(201).send({ Message: "Team Sorted" });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    res.status(500).send({ message: "Error connecting to MongoDB" });
  }
};

export default handler;
