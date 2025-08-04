"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // You can use Heroicons or other icon sets too
import { useAppSelector } from "@/Redux/hook";

export default function SidebarWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const role = useAppSelector((state) => state.auth.user?.role);

  
  // Set route prefix based on role
const routePrefix = role?.toLowerCase() === "tutor" ? "/tutor" : "/studentdashboard";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:text-gray-900 p-2 rounded shadow"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`dark:bg-gray-800 dark:text-white text-blue-600 fixed top-0 left-0 z-40 h-full  bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 lg:h-screen`}
      >
        <div className="p-4">
          <Link href={"/"}>
            <div className="text-3xl font-extrabold mb-10 ">TutorLink</div>
          </Link>
          <nav className="space-y-4  font-medium">
            <Link
              href={`${routePrefix}/profile`}
              className="block hover:text-indigo-500"
            >
              👤 Profile
            </Link>

            {role?.toLowerCase() === "tutor" ? (
              <Link
                href="/tutor/studentrequest"
                className="block hover:text-indigo-500"
              >
                📨 Student Requests
              </Link>
            ) : (
              <Link
                href="/studentdashboard/myrequest"
                className="block hover:text-indigo-500"
              >
                📚 Manage Tutors
              </Link>
            )}

            <Link
              href={`${routePrefix}/mybookings`}
              className="block hover:text-indigo-500"
            >
              📅 My Bookings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Dark overlay when open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
