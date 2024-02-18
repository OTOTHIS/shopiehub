import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import UserContext from "./context/UserContext"
import { router } from "./router"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <>
      <UserContext>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserContext>
      <Toaster />
    </>
  )
}

export default App
