import { Link, Outlet, useNavigate } from "react-router-dom";

import {

  OWNER_DASHBOARD_ROUTE,
  SELECT_MAGAZIN,
} from "../router/index.jsx";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext.jsx";
import { HomeIcon, LogInIcon } from "lucide-react";

export default function GuestLayout() {
  const navigate = useNavigate();
  const {  authenticated } = useUserContext();

  useEffect(() => {
 
    if (authenticated) {
      navigate(SELECT_MAGAZIN);


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
