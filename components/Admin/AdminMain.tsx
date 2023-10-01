"use client"

import { StoreContext } from "@/mobx-store/RootStore"
import { useContext } from "react"

const AdminMain = () => {
  const { groupingStore } = useContext(StoreContext)

  const handleAddUniqueIdentifier = async () => {
    await groupingStore.addUniqueIdentifier()
  }

  const handleGroupTeams = async () => {
    await groupingStore.groupTeams()
  }

  return (
    <div className="text-center mt-7">
      <button
        onClick={handleAddUniqueIdentifier}
        className="rounded-xl w-[250px] py-2 px-4 cursor-pointer border-[0.5px] mr-4 text-slate-100 hover:bg-slate-300 hover:text-slate-800"
      >
        Add Unique Identifiers
      </button>
      <button
        onClick={handleGroupTeams}
        className="rounded-xl w-[250px] py-2 px-4 cursor-pointer border-[0.5px] text-slate-100 hover:bg-slate-300 hover:text-slate-800"
      >
        Group Teams
      </button>
    </div>
  )
}

export default AdminMain
