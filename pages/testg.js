import data from "/utils/GroupedTeams.json";

const testg = () => {
  return (
    <div>
      {data.map((group, index) => (
        <table key={index}>
          <thead>
            <tr>
              <th>Manager Name</th>
              <th>Team Name</th>
              <th>Gameweek Points</th>
              <th>Transfer Cost</th>
              <th>Bench Points</th>
              <th>Match Points</th>
            </tr>
          </thead>
          <tbody>
            {group.group.map((team) => (
              <tr key={team["Fpl Id"]}>
                <td>{team["Manager Name"]}</td>
                <td>{team["Team Name"]}</td>
                <td>{team["Gameweek Points"]}</td>
                <td>{team["Transfer Cost"]}</td>
                <td>{team["Bench Points"]}</td>
                <td>{team["Match Points"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default testg;
