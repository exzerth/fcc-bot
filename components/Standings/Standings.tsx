"use client"

import { StoreContext } from "@/mobx-store/RootStore"
import { Key, useContext, useEffect, useState } from "react"

const Standings = () => {
  const { standingsStore } = useContext(StoreContext)
  const { loading } = standingsStore
  const [standings, setStandings] = useState<any>()

  useEffect(() => {
    const fetchStandings = async () => {
      await standingsStore.getStandings()
      const { standings } = standingsStore
      setStandings(standings)
    }
    fetchStandings()
  }, [])
  return (
    <div>
      <h2>hello</h2>
      {standings?.map((group: any, index: Key) => (
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
