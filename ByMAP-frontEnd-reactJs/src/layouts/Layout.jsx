import { Link, Outlet } from "react-router-dom";
import { Toaster } from 'sonner'
import Logo from "../components/Logo.jsx";
import { LOGIN_ROUTE } from "../router/index.jsx";
import { HomeIcon, LogInIcon } from "lucide-react";
import Navbar from "../components/website/components/nav/Navbar.jsx";
import Footer from "../components/website/components/footer.jsx";

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
        <Footer />
        <Toaster position='top-center' richColors />

     
    </>
  );
}
