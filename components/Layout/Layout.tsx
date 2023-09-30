"use client"

import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import toast, { Toaster, ToastBar } from "react-hot-toast"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
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
      <Header />
      {children}
    </main>
  )
}
