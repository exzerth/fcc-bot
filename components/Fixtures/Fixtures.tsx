"use client"

import { useContext, useState, useEffect } from "react"
import { StoreContext } from "@/mobx-store/RootStore"

/* To display fixtures only */

const Fixtures = () => {
  const { fixturesStore } = useContext(StoreContext)
  const { loading } = fixturesStore
  const [fixtures, setFixtures] = useState<any>()

  useEffect(() => {
    const fetchStandings = async () => {
      await fixturesStore.getFixtures()
      const { fixtures } = fixturesStore
      setFixtures(fixtures)
    }
    fetchStandings()
  }, [])

  const matchup = fixtures && fixtures[0] && fixtures[0].matchups

  /*
  reduce() method is used to iterate through the matchup array.
  Accumulator is initially set to a nested array containing four empty 
  arrays to rep each group. For each iteration, the current element is added 
  to the first empty array if the index of the current element is less than 6, 
  otherwise it's added to the second empty array till the fourth.
  The reduce() method returns the accumulator, which is now the flattened array 
  containing four arrays containing 6 elements each.
   */

  const reducedMatchup = matchup?.reduce(
    (acc: any[][], curr: any, index: number) => {
      if (index < 6) {
        acc[0].push(curr)
      } else if (index == 6 || index < 12) {
        acc[1].push(curr)
      } else if (index == 12 || index < 18) {
        acc[2].push(curr)
      } else if (index == 18 || index < 24) {
        acc[3].push(curr)
      }
      return acc
    },
    [[], [], [], []]
  )

  const groupA = reducedMatchup && reducedMatchup[0].flat(Infinity)
  const groupB = reducedMatchup && reducedMatchup[1].flat(Infinity)
  const groupC = reducedMatchup && reducedMatchup[2].flat(Infinity)
  const groupD = reducedMatchup && reducedMatchup[3].flat(Infinity)

  return (
    <>
      <div>
        <h2>Gameweek One</h2>
        {groupA && groupB && groupC && groupD && (
          <>
            <p>
              {groupA[0].home} vs {groupA[10].away}
            </p>
            <p>
              {groupA[7].home} vs {groupA[7].away}
            </p>
            <br />
            <p>
              {groupB[0].home} vs {groupB[10].away}
            </p>
            <p>
              {groupB[7].home} vs {groupB[7].away}
            </p>
            <br />
            <p>
              {groupC[0].home} vs {groupC[10].away}
            </p>
            <p>
              {groupC[7].home} vs {groupC[7].away}
            </p>
            <br />
            <p>
              {groupD[0].home} vs {groupD[10].away}
            </p>
            <p>
              {groupD[7].home} vs {groupD[7].away}
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default Fixtures
