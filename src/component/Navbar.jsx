import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../store/ThemeContext";
import SearchBar from "./SearchBar.jsx";
import { useAuth } from "../store/AuthContext.jsx";
import siteIcon from "../assets/site-icon.jpeg";

const Navbar = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const [isOpened, setIsOpened] = useState(false);
  const [searchBtn, setSearchBtn] = useState(false);

  const { token, user } = useAuth();

  const menu = [
    { name: "Home", url: "/" },
    { name: "Latest", url: "/latest" },
    { name: "Login", url: "/signin" },
  ];

  const handleMode = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  const handleSearchBtn = () => {
    setSearchBtn(!searchBtn);
  };

  const handleMenu = () => {
    setIsOpened(!isOpened);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 dark:text-white bg-emerald-400 shadow-md">
      <nav className="flex justify-between items-center lg:px-10  ">
        <Link
          to="/"
          className=" h-full w-fit items-center font-bold uppercase flex space-x-4 pl-2 cursor-pointer"
        >
          <img src={siteIcon} className=" w-8 h-8"></img>
          <h2 className="">BlogPress</h2>
        </Link>

        <div
          className={` relative hidden lg:visible w-full lg:flex lg:flex-row lg:justify-evenly space-x-4`}
        >
          {menu.map((item, index) => (
            <Link
              key={index}
              to={
                token && user?._id && item.name === "Login"
                  ? "/settings"
                  : item.url
              }
              className=" bg-emerald-800 rounded-md p-1 m-1 my-4 lg:my-2 text-center lg:rounded-none lg:bg-inherit lg:text-black font-semibold dark:text-white"
            >
              {token && user?._id && item.name === "Login"
                ? "Account"
                : item.name}
            </Link>
          ))}
        </div>

        <div className=" flex justify-between lg:w-3/12">
          <button className=" p-2 font-semibold" onClick={handleSearchBtn}>
            Search
          </button>

          <label className="inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              value=""
              onChange={handleMode}
              checked={themeMode === "dark"}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div
          className=" h-8 w-8 flex justify-center items-center lg:hidden"
          onClick={handleMenu}
        >
          {isOpened ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 20h16" />
              <path d="M4 12h16" />
              <path d="M4 4h16" />
            </svg>
          )}
        </div>
      </nav>
      <div className=" w-full ">
        <div className=" w-full flex justify-center items-center">
          {searchBtn && (
            <div className=" absolute z-10 mt-10 w-2/3 lg:w-1/2">
              {searchBtn && (
                <div
                  onClick={handleSearchBtn}
                  className=" bg-slate-200 absolute -top-3 -right-3 rounded-full h-8 w-8 text-center"
                >
                  <div className=" w-full h-full rounded-full items-center flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-xbox-x"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                      <path d="M9 8l6 8" />
                      <path d="M15 8l-6 8" />
                    </svg>
                  </div>
                </div>
              )}

              <SearchBar />
            </div>
          )}
        </div>

        <div
          className={` relative bg-emerald-600 ${
            isOpened ? "visible" : "hidden"
          } h-fit flex justify-between pl-2 pr-2 items-center dark:bg-slate-900 overflow-hidden text-black `}
        >
          {menu.map((item, index) => (
            <Link
              key={index}
              to={
                token && user?._id && item.name === "Login"
                  ? "/settings"
                  : item.url
              }
              className=" p-1 font-semibold"
            >
              {token && user?._id && item.name === "Login"
                ? "Account"
                : item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
