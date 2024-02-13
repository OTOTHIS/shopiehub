import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../layouts/Layout.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import UserDashboardLayout from "../layouts/UserDashboardLayout.jsx";
import UserDashboard from "../components/User/UserDashboard.jsx";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";
import ManageOwners from "../components/Admin/ManageOwners.jsx";
import OwnerDashboardLayout from "../layouts/OwnerDashboardLayout.jsx";
import OwnerDashboard from "../components/owner/ownerDashboard.jsx";
import OwnerMagazinDashboard from "../components/owner/ownerMagazinDashboard.jsx";
import ProductMagazinDashbord from "../components/owner/productMagazinDashbord.jsx";

export const LOGIN_ROUTE = '/login'
export const User_DASHBOARD_ROUTE = '/User/dashboard'
const ADMIN_BASE_ROUTE = '/admin'
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + '/dashboard'
export const ADMIN_MANAGE_OWNER_ROUTE = ADMIN_BASE_ROUTE + '/manage-owners'
export const OWNER_DASHBOARD_ROUTE = '/owner/dashboard'
export const OWNER_MAGAZIN_ROUTE = '/owner/magazins'
export const OWNER_MAGAZIN_PRODUCT_ROUTE = '/owner/products'

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '*',
        element: <NotFound/>
      },
    ]
  },
  {
    element: <GuestLayout/>,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login/>
      },
    ]
  },
  {
    element: <UserDashboardLayout/>,
    children: [
      {
        path: User_DASHBOARD_ROUTE,
        element: <UserDashboard/>
      },
    ]
  },
  {
    path:ADMIN_BASE_ROUTE,
    index:ADMIN_DASHBOARD_ROUTE,
    element: <AdminDashboardLayout/>,
     
    children: [
      {
        path: ADMIN_DASHBOARD_ROUTE,
        element: <AdminDashboard/>
      },

      {
        path: ADMIN_MANAGE_OWNER_ROUTE,
        element: <ManageOwners/>
      },
    ]
  },
  {
    element: <OwnerDashboardLayout/>,
    children: [
      {
        path: OWNER_DASHBOARD_ROUTE,
        element: <OwnerDashboard/>
      },
      {
        path: OWNER_MAGAZIN_ROUTE,
        element: <OwnerMagazinDashboard/>
      },
      {
        path: OWNER_MAGAZIN_PRODUCT_ROUTE,
        element: <ProductMagazinDashbord/>
      },
    ]
  }

])
