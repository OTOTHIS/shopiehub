import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { LOGIN_ROUTE } from "../router/index.jsx";
import { HomeIcon, LogInIcon } from "lucide-react";

export default function Layout() {
  return (
    <>
     
      <main className={"container"}>
        <Outlet />
      </main>
    </>
  );
}
