import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ADD_FACTEUR, FACTURE_ENTRE_LIST, FACTURE_SORTIE_LIST, LOGIN_ROUTE, OWNER_DASHBOARD_ROUTE, OWNER_MAGAZIN_ROUTE } from "../../router";
import {LogOut} from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";


export function OwnerAdministrationSideBar({ className }) {


  const navigate = useNavigate();
  const { logout: contextLogout, user } = useUserContext();

  const HandleLogOut = async () => {
 
    setUser({})
    setAuthenticated(false)
    localStorage.removeItem('user')
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
         <Link to={FACTURE_SORTIE_LIST}>
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
         Factures de sorties
         </Button>
         </Link>

         <Link to={FACTURE_ENTRE_LIST}>
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
           Factures de Entres
         </Button>
         </Link>

       </div>
     </div>
    
     
   </div>
   <div className=" flex items-end  justify-end" >
    <Button variant="outline" onClick={HandleLogOut} >
   <LogOut />
    Log out</Button></div>
 </div>
  );
}
