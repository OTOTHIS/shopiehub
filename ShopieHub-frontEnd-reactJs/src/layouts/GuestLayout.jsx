import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import {
  ADMIN_DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  OWNER_DASHBOARD_ROUTE,
  User_DASHBOARD_ROUTE,
} from "../router/index.jsx";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext.jsx";
import { HomeIcon, LogInIcon } from "lucide-react";

export default function GuestLayout() {
  const navigate = useNavigate();
  const { role, authenticated } = useUserContext();

  useEffect(() => {
    if (authenticated) {
      switch (role) {
        case "buyer":
          navigate(User_DASHBOARD_ROUTE);
          break;
        case "admin":
          navigate(ADMIN_DASHBOARD_ROUTE);
          break;
        case "owner":
          navigate(OWNER_DASHBOARD_ROUTE);
          break;
      }

    }
  }, []);

  return (
    <>

      <main className={"container mt-50 h-screen grid place-items-center "}>
        <Outlet />
      </main>
    </>
  );
}
