import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { LOGIN_ROUTE, User_DASHBOARD_ROUTE } from "../router/index.jsx";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext.jsx";
import UserApi from "../services/Api/User/UserApi.js";
import UserDropDownMenu from "./UserDropDownMenu.jsx";
import { GaugeIcon } from "lucide-react";
import { UserAdministrationSideBar } from "./Administration/UserAdministrationSideBar.jsx";
import { ModeToggle } from "../components/mode-toggle.jsx";

export default function UserDashboardLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {
    authenticated,
    setUser,
    setAuthenticated,
    role,
    logout: contextLogout,
  } = useUserContext();
  useEffect(() => {
    if (authenticated === true) {
      setIsLoading(false);

      UserApi.getUser("buyer")
        .then(({ data }) => {
          setUser(data);
          setAuthenticated(true);
        })
        .catch((reason) => {
          console.warn(reason);
          contextLogout();
        });
    } else {
      navigate(LOGIN_ROUTE);
    }
  }, [authenticated]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <header>
        <div className="items-center justify-between flex bg-opacity-90 px-12 py-4 mb-4 mx-auto">
          <div className="text-2xl text-white font-semibold inline-flex items-center">
            <Logo />
          </div>
          <div>
            <ul className="flex text-white place-items-center">
              <li className="ml-5 px-2 py-1">
                <Link className={"flex"} to={User_DASHBOARD_ROUTE}>
                  <GaugeIcon className={"mx-1"} />
                  Dashboard
                </Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <UserDropDownMenu />
              </li>
              <li className="ml-5 px-2 py-1">
                <ModeToggle />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <hr />
      <main className={"mx-auto px-10 space-y-4 py-4"}>
        <div className="flex">
          <div className={"w-100 md:w-1/4"}>
            <UserAdministrationSideBar />
          </div>
          <div className={"w-100 md:w-3/4"}>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
