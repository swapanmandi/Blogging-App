import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { AuthProvider } from "../store/AuthContext.jsx";
import { SettingsProvider } from "../store/SettingsContext.jsx";

export default function Routes() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <AuthProvider>
      <SettingsProvider>
        <div className=" w-screen h-screen ">
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className=" flex flex-row w-screen">
            {showSidebar && <Sidebar />}
            <Outlet />
          </div>
          <Footer />
        </div>
      </SettingsProvider>
    </AuthProvider>
  );
}
