import { Link, Outlet } from "react-router-dom";
import { Toaster } from 'sonner'
import Logo from "../components/Logo.jsx";
import { LOGIN_ROUTE } from "../router/index.jsx";
import { HomeIcon, LogInIcon } from "lucide-react";
import Navbar from "../components/website/components/Navbar.jsx";

export default function Layout() {
  return (
    <>
      <main className='relative flex flex-col min-h-screen'>
         
            <Navbar />
            <div className='flex-grow flex-1'>
              <Outlet />
            </div>
            {/* <Footer /> */}
        </main>

        <Toaster position='top-center' richColors />

     
    </>
  );
}
