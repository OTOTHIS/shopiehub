import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx";
import GuestLayout from "@/layouts/GuestLayout.jsx";
import OwnerDashboardLayout from "@/layouts/OwnerDashboardLayout.jsx";
import OwnerDashboard from "../components/owner/ownerDashboard.jsx";
import OwnerMagazinDashboard from "@/components/owner/ownerMagazins/ownerMagazinDashboard.jsx";
import ProductMagazinDashbord from "@/components/owner/productsOwnerMangaer/productMagazinDashbord.jsx";


import SelectMagazin from "@/components/Login/selectMagazin.jsx";
import AddFacteur from "@/components/owner/addFacteur.jsx";



export const LOGIN_ROUTE = '/'
export const OWNER_DASHBOARD_ROUTE = '/owner/dashboard'
export const OWNER_MAGAZIN_ROUTE = '/owner/magazins'
export const OWNER_MAGAZIN_PRODUCT_ROUTE = '/owner/products'
export const OWNER_MAGAZIN_CREATE_PRODUCT_ROUTE = '/owner/products/create'
export const  OWNER_MAGAZIN_CREATE_MAGAZIN_ROUTE = '/owner/magazins/create'
export const SELECT_MAGAZIN = "/select"
export const ADD_FACTEUR = "/owner/addFacteur"
export const router = createBrowserRouter([

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
        path: OWNER_MAGAZIN_ROUTE,
        element: <OwnerMagazinDashboard />
      },
      {
        path: OWNER_MAGAZIN_PRODUCT_ROUTE,
        element: <ProductMagazinDashbord />
      },
      {
        path:ADD_FACTEUR,
        element: <AddFacteur />
      },
     
    ]
  }

])
