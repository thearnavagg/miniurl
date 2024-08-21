import { Button } from "@/component/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/component/ui/sheet";
import { NavbarContext } from "@/context/NavbarContext";
import { LinkIcon, LogOut, MenuIcon } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import { UrlState } from "@/context/UrlContext";
import useFetch from "@/hooks/use-fetch";
import { signout } from "@/db/apiAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BarLoader } from "react-spinners";

const Navbar = () => {
  const { links } = useContext(NavbarContext);
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnSignout } = useFetch(signout);
  const navigate = useNavigate();
  const userName = user?.user_metadata?.name || "CN";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <>
      <header className="bg-background fixed top-0 left-0 w-full z-50 border-b">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2" prefetch={false}>
            <LinkIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">LynQr</span>
          </Link>

          {links.length > 0 && (
            <nav className="hidden items-center gap-6 md:flex">
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
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-[#88ff33]">
                      {firstLetter}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="max-w-[10rem] p-3 mr-2 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="flex flex-col space-y-1.5">
                    <div className="text-sm font-semibold text-gray-800">
                      {user?.user_metadata?.name}
                    </div>
                    <div className="py-1">
                      <Link
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-1.5 rounded-md transition duration-150 ease-in-out"
                        to="/dashboard"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span className="text-sm">My Links</span>
                      </Link>
                    </div>
                    <div
                      className="flex items-center space-x-1 text-rose-600 cursor-pointer hover:text-rose-800 hover:bg-rose-50 p-1.5 rounded-md transition duration-150 ease-in-out"
                      onClick={() => {
                        fnSignout().then(() => {
                          fetchUser();
                          navigate("/");
                        });
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Logout</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
                        prefetch={false}
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
      {loading && <BarLoader className="mb-4" width={"100%"} color="#2f22f2" />}
    </>
  );
};

export default Navbar;
