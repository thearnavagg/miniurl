import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/component/Navbar";
import { Toaster } from "@/component/ui/toaster";

const AppLayout = () => {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default AppLayout;
