import { configure, makeAutoObservable } from "mobx"
import axios from "axios"

configure({ enforceActions: "always" })

const resolveURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api/standings"
  } else {
    return `https://${window.origin}/api/standings`
  }
}

export class StandingsStore {
  loading = true
  standings: any

  constructor() {
    makeAutoObservable(this)
  }

  getStandings = async () => {
    try {
      const response = await axios.get(`${resolveURL()}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      })

      if (response.status !== 200) {
        throw new Error("Failed to fetch standings")
      }

      this.setStandings(response.data)
      this.setLoading(false)
    } catch (error) {
      console.log("Error loading standings: ", error)
      this.setLoading(false)
    }
  }

  setStandings = (res: any) => {
    this.standings = res
  }

  setLoading = (val: boolean) => {
    this.loading = val
  }
}
