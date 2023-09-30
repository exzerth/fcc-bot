import { configure, makeAutoObservable } from "mobx"
import axios from "axios"

configure({ enforceActions: "always" })

export class StandingsStore {
  loading = true
  standings: any

  constructor() {
    makeAutoObservable(this)
  }

  getStandings = async () => {
    try {
      const response = await axios.get(
        `http://${window.origin}/api/standings`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      )

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
