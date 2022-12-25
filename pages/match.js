import clientPromise from "../lib/mongodb";

//to create matchups
//trying to add to db
const oneVsOne = (group) => {
  const matches = [];
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

const match = ({ groupedTeams }) => {
  return (
    <div>
      {groupedTeams.map((group) => (
        <div key={group._id}>
          <h2>Group {group.group[0].group}</h2>
          {oneVsOne(group.group).map((match, index) => (
            <p key={index}>
              {match.team1} vs {match.team2}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");
    const groupedTeams = await db.collection("GroupedTeams").find({}).toArray();
    //console.log(groupedTeams);

    return {
      props: { groupedTeams: JSON.parse(JSON.stringify(groupedTeams)) },
    };
  } catch (error) {
    console.error(error);
  }
}

export default match;
