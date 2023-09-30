import { createContext } from "react"
import { TeamsStore } from "./TeamsStore"
import { StandingsStore } from "./StandingsStore"
import { FixturesStore } from "./FixturesStore"

interface StoreContextInterface {
  teamsStore: TeamsStore
  standingsStore: StandingsStore
  fixturesStore: FixturesStore
}

const teamsStore = new TeamsStore()
const standingsStore = new StandingsStore()
const fixturesStore = new FixturesStore()

export const StoreContext = createContext<StoreContextInterface>({
  teamsStore,
  standingsStore,
  fixturesStore,
})
