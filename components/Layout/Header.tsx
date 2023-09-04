import toast, { ToastBar, Toaster } from "react-hot-toast"

const Header = () => {
  return (
    <nav>
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
      <h1>Head</h1>
    </nav>
  )
}

export default Header
