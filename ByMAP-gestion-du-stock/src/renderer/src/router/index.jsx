import {createBrowserRouter, createHashRouter} from "react-router-dom";
import Login from "../pages/Login.jsx";
import GuestLayout from "@/layouts/GuestLayout.jsx";
import OwnerDashboardLayout from "@/layouts/OwnerDashboardLayout.jsx";
import OwnerDashboard from "../components/owner/ownerDashboard.jsx";



import SelectMagazin from "@/components/Login/selectMagazin.jsx";
import AddFacteur from "@/components/owner/addFacteur.jsx";
import SortieList from "@/components/data-table/factures/facturesSorties/SortieList.jsx";
import EntreList from "@/components/data-table/factures/facturesEntrees/EntreList.jsx";



export const LOGIN_ROUTE = '/'
export const OWNER_DASHBOARD_ROUTE = '/owner/dashboard'
export const OWNER_MAGAZIN_ROUTE = '/owner/magazins'
export const OWNER_MAGAZIN_PRODUCT_ROUTE = '/owner/products'
export const OWNER_MAGAZIN_CREATE_PRODUCT_ROUTE = '/owner/products/create'
export const  OWNER_MAGAZIN_CREATE_MAGAZIN_ROUTE = '/owner/magazins/create'
export const SELECT_MAGAZIN = "/select"
export const ADD_FACTEUR = "/owner/addFacteur"
export const FACTURE_SORTIE_LIST ="/owner/listdesortie"
export const FACTURE_ENTRE_LIST ="/owner/listdeEntre"
export const router = createHashRouter([

  {
    element: <GuestLayout/>,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login />
      },
      {
        path:  SELECT_MAGAZIN,
        element: <SelectMagazin />
      },
    ]
  },


  {
    element: <OwnerDashboardLayout/>,
    children: [
      {
        path: OWNER_DASHBOARD_ROUTE,
        element: <OwnerDashboard  />
      },
   
      {
        path:ADD_FACTEUR,
        element: <AddFacteur />
      },
      {
        path:FACTURE_SORTIE_LIST,
        element: <SortieList />
      },
      {
        path:FACTURE_ENTRE_LIST,
        element: <EntreList />
      },
     
    ]
  }

])
