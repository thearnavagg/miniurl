import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/component/Navbar";

const AppLayout = () => {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
