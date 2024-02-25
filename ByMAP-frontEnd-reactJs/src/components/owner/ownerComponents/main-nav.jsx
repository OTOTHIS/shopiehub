import {
  ShoppingBasket,
  PlusCircle,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ModeToggle } from "../../mode-toggle";
import {
  OWNER_DASHBOARD_ROUTE,
  OWNER_MAGAZIN_PRODUCT_ROUTE,
  OWNER_MAGAZIN_ROUTE,
  OWNER_MAGAZIN_CREATE_PRODUCT_ROUTE,
  OWNER_MAGAZIN_CREATE_MAGAZIN_ROUTE,
} from "../../../router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";


export function MainNav({ className, ...props }) {
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
      {/* <Link
        to={OWNER_DASHBOARD_ROUTE}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <h1
            className="text-sm cursor-pointer font-medium text-muted-foreground transition-colors hover:text-primary"
            variant="outline"
          >
            Products
          </h1>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup className="gy-4">
            <Link to={OWNER_MAGAZIN_PRODUCT_ROUTE}>
              <DropdownMenuItem>
                <ShoppingBasket className="mr-2 h-4 w-4" />
                <span>Product list</span>
              </DropdownMenuItem>
            </Link>

            <Link to={OWNER_MAGAZIN_CREATE_PRODUCT_ROUTE}>
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Add product</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <h1
            className="text-sm cursor-pointer font-medium text-muted-foreground transition-colors hover:text-primary"
            variant="outline"
          >
            Magazins
          </h1>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup className="gy-4">
            <Link to={OWNER_MAGAZIN_ROUTE}>
              <DropdownMenuItem>
                <ShoppingBasket className="mr-2 h-4 w-4" />
                <span>Magazins list</span>
              </DropdownMenuItem>
            </Link>

            <Link to={OWNER_MAGAZIN_CREATE_MAGAZIN_ROUTE}>
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Add magazin</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModeToggle />
    </nav>
  );
}
