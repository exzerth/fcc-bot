import clientPromise from "../../lib/mongodb";

const handler = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");
    const groups = await db.collection("SortedMatchups").find({}).toArray();

    const flattenedsortedmatchups = groups.flatMap((matchs) => {
      return matchs.group;
    });

    const chunks = [];
    for (let i = 0; i < flattenedsortedmatchups.length; i += 12) {
      chunks.push(flattenedsortedmatchups.slice(i, i + 12));
    }
    const fixtures = chunks.map((fixt) => {
      return {
        matchOne: {
          home: { one: [fixt[4].team1], two: [fixt[7].team1] },
          away: { one: [fixt[4].team2], two: [fixt[7].team2] },
        },
        matchTwo: {
          home: { one: [fixt[1].team1], two: [fixt[11].team1] },
          away: { one: [fixt[1].team2], two: [fixt[11].team2] },
        },
        matchThree: {
          home: { one: [fixt[2].team1], two: [fixt[8].team1] },
          away: { one: [fixt[2].team2], two: [fixt[8].team2] },
        },
        matchFour: {
          home: { one: [fixt[3].team1], two: [fixt[9].team1] },
          away: { one: [fixt[3].team2], two: [fixt[9].team2] },
        },
        matchFive: {
          home: { one: [fixt[0].team1], two: [fixt[10].team1] },
          away: { one: [fixt[0].team2], two: [fixt[10].team2] },
        },
        matchSix: {
          home: { one: [fixt[6].team1], two: [fixt[5].team1] },
          away: { one: [fixt[6].team2], two: [fixt[5].team2] },
        },
      };
    });

    await db.collection("Fixtures").insertOne({ fixtures });
    res.status(201).send({ Message: "Fixtures Set" });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    res.status(500).send({ Error: "Error grouping teams" });
  }
};

export default handler;
