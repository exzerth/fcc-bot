import clientPromise from "../lib/mongodb";

const group = ({ groupedTeams }) => {
  return (
    <div>
      {groupedTeams.map((group, index) => (
        <div key={index}>
          <div className="font-bold">{group.group[0].group}</div>
          <table>
            <thead>
              <tr>
                <th title="Team Name">Team Name</th>
                <th title="Played">Played</th>
                <th title="Win">Win</th>
                <th title="Draw">Draw</th>
                <th title="Lose">Lose</th>
                <th title="Points">Points</th>
                <th title="Total Score">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {group.group.map((team) => (
                <tr key={team._id}>
                  <td>{team.TeamName}</td>
                  <td>{team.Played}</td>
                  <td>{team.Win}</td>
                  <td>{team.Draw}</td>
                  <td>{team.Lose}</td>
                  <td>{team.Points}</td>
                  <td>{team.TotalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps({ props }) {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const groupedTeams = await db.collection("GroupedTeams").find({}).toArray();

    return {
      props: { groupedTeams: JSON.parse(JSON.stringify(groupedTeams)) },
    };
  } catch (error) {
    console.error(error);
  }
}

export default group;
