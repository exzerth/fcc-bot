import { configure, makeAutoObservable } from "mobx"
import axios from "axios"
import toast from "react-hot-toast"

configure({ enforceActions: "always" })

export class GroupingStore {
  loading = true

  constructor() {
    makeAutoObservable(this)
  }

  addUniqueIdentifier = async () => {
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    }

    try {
      const response = await axios.put(`${window.origin}/api/randomize`, {
        headers,
      })

      this.setLoading(false)

      if (response.data.error) {
        toast.error("Failed!")
      } else {
        toast.success("Identifiers Added!")
      }
    } catch (error) {
      this.setLoading(false)
      toast.error("Error adding identifier")
    }
  }

  groupTeams = async () => {
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    }

    try {
      const response = await axios.put(`${window.origin}/api/groupteams`, {
        headers,
      })

      this.setLoading(false)

      if (response.data.error) {
        toast.error("Failed!")
      } else {
        toast.success("Teams Grouped!")
      }
    } catch (error) {
      this.setLoading(false)
      toast.error("Error grouping teams")
    }
  }

  setLoading = (val: boolean) => {
    this.loading = val
  }
}
