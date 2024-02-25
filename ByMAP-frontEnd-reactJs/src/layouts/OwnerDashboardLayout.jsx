import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { LOGIN_ROUTE, User_DASHBOARD_ROUTE } from "../router/index.jsx";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext.jsx";
import UserApi from "../services/Api/User/UserApi.js";
import UserDropDownMenu from "./UserDropDownMenu.jsx";
import { GaugeIcon } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle.jsx";
import { OwnerAdministrationSideBar } from "./Administration/ownerAdministrationSideBar.jsx";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable.jsx";
import TeamSwitcher from "../components/owner/ownerComponents/team-switcher.jsx";
import { UserNav } from "../components/owner/ownerComponents/user-nav.jsx";
import { Search } from "../components/owner/ownerComponents/search.jsx";
import { MainNav } from "../components/owner/ownerComponents/main-nav.jsx";

export default function OwnerDashboardLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {
    authenticated,
    setUser,
    setAuthenticated,
    logout: contextLogout,
  } = useUserContext();
  useEffect(() => {
    if (authenticated === true) {
      setIsLoading(false);
      UserApi.getUser("owner")
        .then(({ data }) => {
          setUser(data);
          setAuthenticated(true);
          console.log(data)
        })
        .catch((reason) => {
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
   
     <div className="flex-col md:flex">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <div className="w-[200px]"></div>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
          <Outlet />
        </div>



  
  );
}
