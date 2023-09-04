import { Key } from "react"

interface StandingsProps {
  groupedTeams: any
}

const Standings: React.FC<StandingsProps> = ({ groupedTeams }) => {
  return (
    <div>
      {groupedTeams.map((group: any, index: Key) => (
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
              {group.group.map((team: any) => (
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
  )
}

export default Standings
