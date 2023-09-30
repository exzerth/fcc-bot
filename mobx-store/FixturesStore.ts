import { configure, makeAutoObservable } from "mobx"
import axios from "axios"

configure({ enforceActions: "always" })

const resolveURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api/fixtures"
  } else {
    return `https://${window.origin}/api/fixtures`
  }
}
export class FixturesStore {
  loading = true
  fixtures: any

  constructor() {
    makeAutoObservable(this)
  }

  getFixtures = async () => {
    try {
      const response = await axios.get(`${resolveURL()}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      })

      if (response.status !== 200) {
        throw new Error("Failed to fetch fixtures")
      }

      this.setFixtures(response.data)
      this.setLoading(false)
    } catch (error) {
      console.log("Error loading fixtures: ", error)
      this.setLoading(false)
    }
  }

  setFixtures = (res: any) => {
    this.fixtures = res
  }

  setLoading = (val: boolean) => {
    this.loading = val
  }
}
