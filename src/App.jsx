import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";
import PostContextProvider from "./store/PostContext-store";
import { ThemeContextProvider } from "./store/ThemeContext";
import Breadcrums from "./component/Breadcrums.jsx";

function App() {
  const [themeMode, setThemeMode] = useState(() =>{
    return localStorage.getItem("themeMode" || "light")
  });

  useEffect(() =>{
    localStorage.setItem("themeMode", themeMode)
  }, [themeMode]);


  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("body").classList.add("dark:bg-black");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <PostContextProvider>
      <ThemeContextProvider value={{ themeMode, lightTheme, darkTheme }}>
        <Navbar />
        <Breadcrums />
        <Outlet />
        <Footer />
      </ThemeContextProvider>
    </PostContextProvider>
  );
}

export default App;
