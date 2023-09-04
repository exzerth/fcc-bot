import Link from "next/link"
import Teams from "@/components/Teams/Teams"

export default function Home() {
  return (
    <>
      <Teams />
      <div className="flex justify-center gap-7 mt-[20px] text-[blue]">
        <Link href="/register">Register</Link>
        <Link href="/standings">Standings</Link>
        <Link href="/fixtures">Fixtures</Link>
      </div>
    </>
  )
}
