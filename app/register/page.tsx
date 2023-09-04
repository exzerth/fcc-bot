"use client"

//Teams registration page
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "fpl-ts"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import toast, { Toaster, ToastBar } from "react-hot-toast"

const Register = () => {
  const supabase = createClientComponentClient<any>()
  const [fplId, setFplId] = useState<string>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // implementation of newTeamHandler function
  const newTeamHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const user = new User(Number(fplId))

    const details: any = await user.getDetails()

    try {
      if (fplId === "") {
        toast.error("Field can't be empty")
      } else {
        const { error } = await supabase.from("teams").insert({
          fpl_id: details?.id,
          manager_name: `${details?.player_first_name} ${details?.player_last_name}`,
          team_name: details?.name,
          win: "",
          draw: "",
          lose: "",
          points: "",
          total_score: "",
          played: "",
        })
        if (error) {
          toast.error(error.message)
        } else {
          toast.success("Team Registered")
        }
        setFplId("")
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }

    router.push("/")
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        containerStyle={{
          top: 100,
        }}
        toastOptions={{
          duration: 5000,
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {t.type !== "loading" && (
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    style={{
                      width: "50px",
                      background: "white",
                      border: "none",
                    }}
                  >
                    {icon}
                  </button>
                )}
                {message}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <div className="flex-col max-w-3xl px-12 py-12 mx-auto shadow-xl rounded-2xl">
        <h1 className="text-4xl font-light">Add a new Team </h1>
        <form onSubmit={newTeamHandler}>
          <input
            type="text"
            placeholder="FPL ID"
            required
            onChange={(e) => setFplId(e.target.value)}
            className="w-full h-10 p-2 my-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full px-4 py-4 text-xl font-medium text-gray-800 bg-yellow-500 border rounded-xl"
          >
            {loading ? "Adding..." : "Add Now"}
          </button>
          <div className="flex justify-center gap-7 mt-[20px] text-[blue]">
            <Link href="/">Teams</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
