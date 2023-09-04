"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { redirect, useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const AuthContext = createContext({})

export const useAuth = () => useContext<any>(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const supabase = createClientComponentClient<any>()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session)
    })
  }, [supabase])

  const signUp = async (email: string, password: string, fullname: string) => {
    //setLoading(true)
    async function fetchUserData() {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("email")
          .eq("email", email)

        if (error) {
          throw error
        }
        //console.log(data)

        if (data.length > 0) {
          toast.error("User Exists, Login Instead")
        } else {
          try {
            const { data } = await supabase.auth.signUp({
              email,
              password,
            })
            const { user }: any = data
            // console.log("Sign: ", user)
            // console.log("Session: ", session)

            if (user) {
              const { error } = await supabase.from("user_profiles").insert({
                uid: user.id,
                fullname: fullname,
                email: user.email,
                role: user.role,
                is_admin: false,
                email_verified: false,
              })
              if (error) {
                throw error
              }
              router.push("/verify-email")
            } else {
              console.log("Insert Error")
              //toast.error("User exists, Login instead")
            }

            setUser(user)
            return user
          } catch (error) {
            // Handle sign-up error
            console.error(error)
            throw error
          }
        }

        //setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    if (email) {
      fetchUserData()
    } else {
      console.log("Email Required")
    }
    //setLoading(false)
  }

  const logIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      //setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        toast.error(`${error.message}`)
        setLoading(false)
      }
      const { user, session }: any = data

      if (session) {
        router.push("/shop")
      }

      // if (user !== null) {
      //   const isConfirmed = user.hasOwnProperty("email_confirmed_at")

      //   if (isConfirmed) {
      //     const { error } = await supabase
      //       .from("user_profiles")
      //       .update({ email_verified: true })
      //       .eq("uid", user.id)
      //     if (error) {
      //       throw error
      //     }
      //     router.push("/shop")
      //     /* if (currentUserData?.isAdmin) {
      //     router.push("/admin/create-job-adverts")
      //   } else {
      //     router.push("/shop")
      //   } */
      //   } else {
      //     router.push("/verify-email")
      //   }
      // }
      setUser(session)
      return user
    } catch (error) {
      setLoading(false)
      console.error(error)
      throw error
    }
  }

  const logOut = async () => {
    setUser(null)
    await supabase.auth.signOut()
    router.push("/signin")
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        user,
        /* loading, */
      }}
    >
      {/* {loading ? null : children} */}
      {children}
    </AuthContext.Provider>
  )
}
