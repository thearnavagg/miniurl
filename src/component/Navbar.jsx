import { Button } from "@/component/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/component/ui/sheet";
import { NavbarContext } from "@/context/NavbarContext";
import { LinkIcon, LogOut, MenuIcon } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import { UrlState } from "@/context/UrlContext";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { links } = useContext(NavbarContext);
  const { user } = UrlState();
  const navigate = useNavigate();
  return (
    <header className="bg-background fixed top-0 left-0 w-full z-50 border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2" prefetch={false}>
          <LinkIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">LynQr</span>
        </Link>

        {links.length > 0 && (
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              className="md:inline-flex"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserAvatar user={user} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-rose-500 hover:bg-rose-50 transition ease-in-out duration-300 "
                  onClick={() => {}}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {links.length > 0 && (
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs">
                  <div className="flex flex-col items-start gap-6 p-6">
                    <Link
                      to="/"
                      className="flex items-center gap-2"
                      prefetch="false"
                    >
                      <LinkIcon className="h-6 w-6" />
                      <span className="text-lg font-semibold">LynQr</span>
                    </Link>
                    <nav className="grid gap-4">
                      {links.map((link) => (
                        <NavLink key={link.label} href={link.href}>
                          {link.label}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
