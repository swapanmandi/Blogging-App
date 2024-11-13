import React from "react";
import Dashboard from "./Dashboard.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { AuthProvider } from "../store/AuthContext.jsx";
import { SettingsProvider } from "../store/SettingsContext.jsx";

export default function Home() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <div className=" w-screen h-screen ">
          <Navbar />

          <div className=" flex flex-row w-screen">
            <Sidebar />
            <Outlet />
          </div>

          <Footer />
        </div>
      </SettingsProvider>
    </AuthProvider>
  );
}
