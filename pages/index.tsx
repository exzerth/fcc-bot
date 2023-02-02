//Teams registration page
import { useRef } from "react"
import { useRouter } from "next/router"
import { User } from "fpl-ts"
import Link from "next/link"

const NewTeamForm: React.FC = () => {
  // use of useRef to capture input value
  const fplIdRef = useRef<HTMLInputElement>(null)

  // use of useRouter from next/router to redirect this page to the Homepage
  const router = useRouter()

  // implementation of newTeamHandler function
  const newTeamHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const fplIdString = fplIdRef.current?.value

    if (!fplIdRef.current) {
      return
    }

    const fplId = Number(fplIdString)

    const user = new User(fplId)

    const details = await user.getDetails()
    //const history = await user.gwHistory();
    console.log(`Details: ${details}`)
    //console.log(`History: ${history}`);

    // store team data in an object

    const teamData = {
      FplId: (details as any).id,
      ManagerName: `${(details as any).player_first_name} ${
        (details as any).player_last_name
      }`,
      TeamName: (details as any).name,
      Played: "",
      Win: "",
      Draw: "",
      Lose: "",
      Points: "",
      TotalScore: "",
    }

    // use of Fetch API to make a request to the register api and get back a response
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(teamData),
      headers: {
        "content-Type": "application/json",
      },
    })

    // parses JSON response into native JavaScript objects
    const data = await response.json()

    console.log(data)

    // redirects this page to the Homepage
    router.replace("/teams")
  }

  const INPUT_STYLE =
    "my-2 p-2 border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none w-full h-10 rounded-md"

  return (
    <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl">
      <h1 className="font-light text-4xl">Add a new Team </h1>
      <form onSubmit={newTeamHandler}>
        <input
          type="text"
          placeholder="FPL ID"
          required
          ref={fplIdRef}
          className={INPUT_STYLE}
        />

        <button
          type="submit"
          className="bg-yellow-500 text-gray-800 font-medium text-xl inline-flex  w-full items-center px-4 py-4 rounded-xl"
        >
          Add Now
        </button>
        <div className="flex justify-center gap-7 mt-[20px] text-[blue]">
          <Link href="/teams">Teams</Link>
        </div>
      </form>
    </div>
  )
}

export default NewTeamForm
