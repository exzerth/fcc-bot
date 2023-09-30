"use client"

import { Key, useContext, useEffect, useState } from "react"
import { StoreContext } from "@/mobx-store/RootStore"
import { Teams } from "@/types/teams"

const Teams = () => {
  const { teamsStore } = useContext(StoreContext)
  const { loading } = teamsStore
  const [teams, setTeams] = useState<Teams[]>()

  useEffect(() => {
    const fetchTeams = async () => {
      await teamsStore.getTeams()
      const { teams } = teamsStore
      setTeams(teams)
    }
    fetchTeams()
  }, [])

  return (
    <div className="container px-6 mx-auto min-h-[100vh]">
      <div className="mt-[20px] rounded-[5px]">
        <h1 className="text-3xl font-semibold text-slate-100 text-center mb-6">
          REGISTERED TEAMS
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {teams && teams?.length > 0 ? (
              <div className="grid grid-cols-4 gap-6">
                {teams.map((team, index: Key) => (
                  <div
                    className="grid items-center mb-4 bg-white bg-opacity-60 rounded-xl p-4 min-h-[110px]"
                    key={index}
                  >
                    <p>
                      <span className="font-medium">Team Name</span> :{" "}
                      {team.TeamName}
                    </p>
                    <p>
                      <span className="font-medium">Manager Name</span>:{" "}
                      {team.ManagerName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Registration TBA</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default Teams
