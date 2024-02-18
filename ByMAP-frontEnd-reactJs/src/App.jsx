import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import UserContext from "./context/UserContext.jsx";
import {ThemeProvider} from "./components/theme-provider.jsx";
import {Toaster} from "./components/ui/toaster.jsx";

function App() {
  return (
    <>
      <UserContext>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router}/>
        </ThemeProvider>
      </UserContext>
      <Toaster/>
    </>
  )
}

export default App
