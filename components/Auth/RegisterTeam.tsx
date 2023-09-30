"use client"

//Teams registration page
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "fpl-ts"
import toast from "react-hot-toast"
import { StoreContext } from "@/mobx-store/RootStore"

const Register = () => {
  const { teamsStore } = useContext(StoreContext)
  const [fplId, setFplId] = useState<string>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // implementation of newTeamHandler function
  const handleRegisterTeam = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setLoading(true)

    const user = new User(Number(fplId))
    const details: any = await user.getDetails()

    try {
      if (fplId === "") {
        toast.error("Field can't be empty")
      } else {
        const teamData = {
          FplId: details?.id,
          ManagerName: `${details?.player_first_name} ${details?.player_last_name}`,
          TeamName: details?.name,
          Win: "",
          Draw: "",
          Lose: "",
          Points: "",
          TotalScore: "",
          Played: "",
        }
        await teamsStore.createTeam(teamData)
        setFplId("")
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }

    router.push("/teams")
  }

  return (
    <>
      <div className="bg-white flex-col px-12 py-12 mx-auto shadow-xl rounded-2xl">
        <h1 className="text-3xl font-semibold text-headingDark text-center mb-4">
          Join League{" "}
        </h1>
        <form onSubmit={handleRegisterTeam}>
          <input
            type="text"
            placeholder="FPL ID"
            required
            onChange={(e) => setFplId(e.target.value)}
            className="w-full h-10 p-2 my-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full mt-4 py-3 text-xl font-medium text-gray-800 bg-yellow-500 border rounded-xl"
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
