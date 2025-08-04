import Sidebar from "@/components/dashboard/student/SideBar";
import React from "react";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col sm:flex-row md:flex ">
      <div className="lg:w-[20%]">
      <Sidebar />
      </div>
      <div className="w-full px-4 lg:w-[80%] mx-auto dark:bg-gray-900 min-h-screen py-20 mx-2 "> {children}</div>
    </div>
  );
};

export default Dashboardlayout;
