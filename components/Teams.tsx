import { Key } from "react"

interface TeamProps {
  teams: []
}

const Teams: React.FC<TeamProps> = ({ teams }) => {
  return (
    <div className="container w-[500px] mx-auto flex flex-col justify-center items-center mt-[50px] border-2 rounded-[5px]">
      <div className="font-semibold text-2xl pb-2">REGISTERED TEAMS</div>
      {teams.map(
        (team: { TeamName: string; ManagerName: string }, index: Key) => (
          <div key={index}>
            <div className="self-start py-2">
              <div>
                <span className="font-medium">Team Name: </span>
                {team.TeamName}{" "}
              </div>
              <div>
                <span className="font-medium">Manager Name: </span>
                {team.ManagerName}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
export default Teams
