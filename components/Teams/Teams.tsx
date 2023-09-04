"use client"

import { Key, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type Teams = {
  id: number
  created_at: Date
  fpl_id: string
  manager_name: string
  team_name: string
  win: string
  draw: string
  lose: string
  points: string
  total_score: string
  played: string
}

const Teams = () => {
  const [teams, setTeams] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient<any>()

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      const { data: teams, error } = await supabase.from("teams").select()

      if (error) {
        console.log("error", error)
      } else {
        setTeams(teams)
        setLoading(false)
      }
    }
    fetchJobs()
  }, [supabase])

  return (
    <div className="container w-[500px] mx-auto flex flex-col justify-center items-center mt-[50px] border-2 rounded-[5px]">
      <div className="pb-2 text-2xl font-semibold">REGISTERED TEAMS</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {teams.length > 0 ? (
            <>
              {teams.map((team: Teams, index: Key) => (
                <div key={index}>
                  <div className="self-start py-2">
                    <div>
                      <span className="font-medium">Team Name: </span>
                      {team.team_name}{" "}
                    </div>
                    <div>
                      <span className="font-medium">Manager Name: </span>
                      {team.manager_name}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>Registration TBA</p>
          )}
        </>
      )}
    </div>
  )
}
export default Teams
