import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../router/index.jsx";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext.jsx";

import { GaugeIcon } from "lucide-react";
// import { Search } from "@/components/owner/ownerComponents/search.jsx";
// import { UserNav } from "@/components/owner/ownerComponents/user-nav.jsx";
import { MainNav } from "@/components/owner/ownerComponents/main-nav.jsx";
import { OwnerAdministrationSideBar } from "./Administration/ownerAdministrationSideBar.jsx";
import { UserNav } from "@/components/owner/ownerComponents/user-nav.jsx";



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
    
      // UserApi.getUser()
      //   .then(({ data }) => {
      //     setUser(data);
      //     setAuthenticated(true);
      //     console.log(data)
      //   })
      //   .catch((reason) => {
      //     contextLogout();
      //   });
   
      const user = localStorage.getItem('user')
     console.log(JSON.parse(user))
      


        // const { status, data } = await axios.get('http://localhost:9900/api/user/'+values.email);



    } else {
      navigate(LOGIN_ROUTE);
    }
  }, [authenticated]);

  if (isLoading) {
    return <></>;
  }

  return (
   
     <div className="flex-col md:flex">
          <div className="flex">
          <OwnerAdministrationSideBar />
          <div className=" mx-20 w-full my-5">
          <Outlet />
          </div>
          </div>
        </div>



  
  );
}
