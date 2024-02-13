

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ModeToggle } from "../../mode-toggle"
import { OWNER_DASHBOARD_ROUTE, OWNER_MAGAZIN_PRODUCT_ROUTE, OWNER_MAGAZIN_ROUTE } from "../../../router"

export function MainNav({
  className,
  ...props
}) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to={OWNER_DASHBOARD_ROUTE}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to={OWNER_DASHBOARD_ROUTE}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        to={OWNER_MAGAZIN_PRODUCT_ROUTE}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
       
 to={OWNER_MAGAZIN_ROUTE}        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
         
        Magazins
      </Link>
      <ModeToggle />
    </nav>
  )
}
