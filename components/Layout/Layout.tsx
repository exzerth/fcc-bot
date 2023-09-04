"use client"

import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { usePathname } from "next/navigation"

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <main>
      {pathname === "/signin" || pathname === "/signup" ? (
        <>
          <Header />
          {children}
        </>
      ) : pathname === "/verify-email" ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </main>
  )
}
