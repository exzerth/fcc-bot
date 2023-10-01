import { createContext } from "react"
import { TeamsStore } from "./TeamsStore"
import { StandingsStore } from "./StandingsStore"
import { FixturesStore } from "./FixturesStore"
import { GroupingStore } from "./GroupingStore"

interface StoreContextInterface {
  teamsStore: TeamsStore
  standingsStore: StandingsStore
  fixturesStore: FixturesStore
  groupingStore: GroupingStore
}

const teamsStore = new TeamsStore()
const standingsStore = new StandingsStore()
const fixturesStore = new FixturesStore()
const groupingStore = new GroupingStore()

export const StoreContext = createContext<StoreContextInterface>({
  teamsStore,
  standingsStore,
  fixturesStore,
  groupingStore,
})
