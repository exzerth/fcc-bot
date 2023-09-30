import { configure, makeAutoObservable } from "mobx"
import axios from "axios"
import toast from "react-hot-toast"

configure({ enforceActions: "always" })

export class TeamsStore {
  loading = true
  teams: any

  constructor() {
    makeAutoObservable(this)
  }

  createTeam = async (teamData: any) => {
    const headers = {
      accept: "application/json",
      //Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    }

    try {
      const response = await axios.post(
        `http://${window.origin}/api/teams`,
        teamData,
        {
          headers,
        }
      )

      this.setLoading(false)

      if (response.data.error) {
        toast.error("Registration Failed!")
      } else {
        toast.success("Registration Successful!")
      }
    } catch (error) {
      this.setLoading(false)
      toast.error(
        "We are unable to process your registration at this time. Please try again later!"
      )
    }
  }

  getTeams = async () => {
    try {
      const response = await axios.get(`http://${window.origin}/api/teams`, {
        headers: {
          "Cache-Control": "no-store",
        },
      })

      if (response.status !== 200) {
        throw new Error("Failed to fetch teams")
      }

      this.setTeams(response.data)
      this.setLoading(false)
    } catch (error) {
      console.log("Error loading teams: ", error)
      this.setLoading(false)
    }
  }

  setTeams = (res: any) => {
    this.teams = res
  }

  setLoading = (val: boolean) => {
    this.loading = val
  }
}
