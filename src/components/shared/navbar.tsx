"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
// import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppDispatch,useAppSelector } from "@/Redux/hook";
import { persistor } from "@/Redux/store";
import { logout, selectCurrentUser} from '@/Redux/Features/Auth/authSlice';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser);
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Tutors", href: "/tutors" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blogs", href: "/blogs" },
    { label: "FAQ", href: "/faq" },
  ];

  // const { user, setIsLoading } = useUser();
  const user =useAppSelector((state)=>state.auth.user)
  const router = useRouter();
  // const location = usePathname();
 
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    persistor.purge();
    router.push("/");
    // if (protectedRoutes.some((route) => location.match(route))) {
    //   router.push("/");
    // }
    
  };

  const linkClasses = (href: string) =>
    `text-lg font-bold transition transform hover:-translate-y-0.5 hover:scale-105 duration-200 ${
      pathname === href
        ? "text-blue-600 underline underline-offset-4"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 overflow-x-hidden shadow-sm shadow-blue-600 ${
        scrolled ? "bg-blue-100 shadow-md text-black" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex justify-between items-center overflow-x-hidden">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden text-sm px-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link
            href="/"
            className="text-2xl text-blue-600 md:text-4xl font-bold whitespace-nowrap"
          >
            TutorLink 🎓
          </Link>
        </div>
        {/* menu for desktop device */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* login button for desktop device */}
        <section className="flex items-center gap-4">
          {/* <CartSheet></CartSheet> */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={currentUser.image}
                    alt="User Profile Picture"
                    className="w-10 h-10 rounded-full"
                  />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-black border-blue-600 shadow-[0px_0px_5px_theme(colors.blue.600)]">
                <DropdownMenuLabel className=" items-center text-gray-100 ">
                  {user.role}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {user.role == "Student" ? (
                  <DropdownMenuItem>
                    <Link
                      href="/studentdashboard"
                      className=" flex gap-1 items-center text-lg text-blue-600 "
                    >
                      {" "}
                      <LayoutDashboard className=" text-blue-600" />
                      DashBoard
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    {" "}
                    <Link
                      className=" flex gap-1 items-center text-base text-blue-600 "
                      href="/tutor"
                    >
                      {" "}
                      <LayoutDashboard className=" text-blue-600" />
                      DashBoard
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  className=" flex gap-1 items-center text-base text-blue-600 "
                  onClick={handleLogOut}
                >
                  <LogOut className=" text-blue-600" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className=" flex gap-2">
              <Link href={"/login"}>
                <Button
                  variant="outline"
                  className="hover:bg-blue-600 bg-white shadow-lg shadow-blue-600 hover:text-white text-blue-600 border-blue-600 flex items-center gap-2 "
                >
                  <LogIn />
                  Login
                </Button>
              </Link>
            </div>
          )}

          {/* avtar img */}
        </section>
      </div>
      {/* for mobile device  */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 border-t shadow-md w-full overflow-hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses(link.href)}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button className="transition-transform hover:scale-105 duration-300">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
