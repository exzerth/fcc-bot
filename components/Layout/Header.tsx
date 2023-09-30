import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname()
  return (
    <nav className="bg-[#57358d] sticky top-0">
      <div className="container px-6 mx-auto py-6 flex justify-between items-center">
        <div className="logo">
          <Link href="/" className="font-bold text-2xl text-slate-100">
            F.C.C
          </Link>
        </div>
        <div className="pages">
          <div className="flex justify-center gap-7 text-slate-100">
            {pathname === "/" ? (
              <Link href="/teams">Teams</Link>
            ) : (
              <>
                <Link href="/">Join League</Link>
                <Link href="/teams">Teams</Link>
                <Link href="/standings">Standings</Link>
                <Link href="/fixtures">Fixtures</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
