import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../../components/ui/button";
import { ADD_FACTEUR, LOGIN_ROUTE, OWNER_DASHBOARD_ROUTE, OWNER_MAGAZIN_ROUTE } from "../../router";
import {LogOut} from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import UserApi from "@/services/Api/User/UserApi";

export function OwnerAdministrationSideBar({ className }) {


  const navigate = useNavigate();
  const { logout: contextLogout, user } = useUserContext();

  const HandleLogOut = async () => {
    UserApi.logout().then(() => {
      contextLogout();
      navigate(LOGIN_ROUTE);
    });
  };


  return (
    <div className={cn("mt-10  flex flex-col justify-between  h-full")}>
    <div className="w-44  ">
     <div className="px-3 py-2">
       <h2 className="mb-2 px-0 md:px-4 text-lg font-semibold tracking-tight">
         Administration
       </h2>
       <div className="space-y-1">
        <Link to={OWNER_DASHBOARD_ROUTE}>
          <Button variant="secondary" className="w-full justify-start">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             className="mr-2 h-4 w-4"
           >
             <circle cx="12" cy="12" r="10" />
             <polygon points="10 8 16 12 10 16 10 8" />
           </svg>
           Dashboard
         </Button>
        </Link>
       </div>
     </div>
     <div className="px-3 py-2">
       <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
         Factures
       </h2>
       <div className="space-y-1">
         <Link to={ADD_FACTEUR}>
         <Button variant="ghost" className="w-full justify-start">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             className="mr-2 h-4 w-4"
           >
             <path d="M21 15V6" />
             <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
             <path d="M12 12H3" />
             <path d="M16 6H3" />
             <path d="M12 18H3" />
           </svg>
          Ajouter un facture
         </Button>
         </Link>
         <Button variant="ghost" className="w-full justify-start">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             className="mr-2 h-4 w-4"
           >
             <circle cx="8" cy="18" r="4" />
             <path d="M12 18V2l7 4" />
           </svg>
           Songs
         </Button>
         <Button variant="ghost" className="w-full justify-start">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             className="mr-2 h-4 w-4"
           >
             <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
             <circle cx="12" cy="7" r="4" />
           </svg>
           Made for You
         </Button>
         <Button variant="ghost" className="w-full justify-start">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             className="mr-2 h-4 w-4"
           >
             <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
             <circle cx="17" cy="7" r="5" />
           </svg>
           Artists
         </Button>
         <Button variant="ghost" className="w-full justify-start">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             className="mr-2 h-4 w-4"
           >
             <path d="m16 6 4 14" />
             <path d="M12 6v14" />
             <path d="M8 8v12" />
             <path d="M4 4v16" />
           </svg>
           Albums
         </Button>
       </div>
     </div>
     <div className="py-2">
       <h2 className="relative px-7 text-lg font-semibold tracking-tight">
         Playlists
       </h2>
    
     </div>
     
   </div>
   <div className=" flex items-end  justify-end" >
    <Button variant="outline" onClick={HandleLogOut} >
   <LogOut />
    Log out</Button></div>
 </div>
  );
}
