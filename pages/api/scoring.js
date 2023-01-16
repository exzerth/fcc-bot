import clientPromise from "../../lib/mongodb";
import { User } from "fpl-ts";

const handler = async (req, res) => {
  try {
    // Connect to the MongoDB database
    const client = await clientPromise;
    const db = client.db("fpldata");
    const fixturesData = await db.collection("Fixtures").find().toArray();
    const groupedTeamsData = await db
      .collection("GroupedTeams")
      .find()
      .toArray();
    const updatedScoresCollection = await db.collection("UpdatedScores");

    //get scores
    const fplIdArr = [4273, 98372, 4829, 14562];
    fplIdArr.map(async (id) => {
      const team = new User(id);
      const history = await team.gwHistory([19]);
      //console.log(history);
    });

    // Iterate through fixtures, updating scores based on outcome
    const fixtures = fixturesData[0].fixtures;
    fixtures.map((fixture) => {
      let home_team = fixture.matchOne.home.one;
      let away_team = fixture.matchOne.away.one;
      console.log(home_team);
    });
    for (let i = 0; i < fixturesData.length; i++) {
      let home_team = fixturesData[i].home_team;
      let away_team = fixturesData[i].away_team;
      let home_score = fixturesData[i].home_score;
      let away_score = fixturesData[i].away_score;

      if (home_score > away_score) {
        home_team.points += 3;
      } else if (away_score > home_score) {
        away_team.points += 3;
      } else {
        home_team.points += 1;
        away_team.points += 1;
      }
    }

    /* // Iterate through grouped teams, updating total points based on updated scores
    for (let i = 0; i < groupedTeamsData.length; i++) {
      for (let j = 0; j < groupedTeamsData[i].teams.length; j++) {
        groupedTeamsData[i].teams[j].total_points =
          groupedTeamsData[i].teams[j].points;
      }
    }

    // Insert the updated scores into the "UpdatedScores" collection
    updatedScoresCollection.insertMany(
      [fixturesData, groupedTeamsData],
      function (err, r) {
        console.log("Inserted documents into the collection");
      }
    ); */

    res.status(201).send({ Message: "Scores Updated" });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    res.status(500).send({ Error: "Error updating scores" });
  }
};

export default handler;
