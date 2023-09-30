"use client"

import { useContext, useEffect, useState } from "react"
import { StoreContext } from "@/mobx-store/RootStore"

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { teamsStore } = useContext(StoreContext)

  useEffect(() => {
    const loadData = async () => {
      await teamsStore.getTeams()
    }
    loadData()
  }, [])

  return <>{<div>{children}</div>}</>
}
