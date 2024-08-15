import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../store/ThemeContext";
import SearchBar from "./SearchBar.jsx";

const Navbar = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const [isOpened, setIsOpened] = useState(false);
  const [searchBtn, setSearchBtn] = useState(false);

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
    <>
      <nav className=" dark:text-white bg-emerald-400">
        <div className="flex justify-between items-center lg:px-10 dark:bg-slate-900 ">
          <Link to="/">
            <div className=" font-bold uppercase">Blogging App</div>
          </Link>

          <div>
            <div className=" lg:flex">
              <button className=" p-3" onClick={handleSearchBtn}>
                Search
              </button>
            </div>
          </div>

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

          <div
            className=" h-8 w-8 flex justify-center items-center lg:hidden"
            onClick={handleMenu}
          >
            {isOpened ? "X" : "O"}
          </div>
        </div>

        <div className={``}>
          {searchBtn && (
            <div className=" ml-5 absolute lg:relative w-10/12 h-10">
              {searchBtn && (
                <span
                  onClick={handleSearchBtn}
                  className=" absolute -top-3 -right-3 bg-red-500 rounded-full h-8 w-8 text-center"
                >
                  X
                </span>
              )}

              <SearchBar />
            </div>
          )}

          <div
            className={` relative ${searchBtn && "mt-12 lg:mt-2"} ${
              isOpened ? "visible" : "hidden"
            } h-fit items-center dark:bg-slate-900 overflow-hidden lg:flex lg:justify-between text-md text-black `}
          >
            <ul className=" p-2 space-y-2 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0 font-semibold flex flex-col lg:flex lg:flex-row lg:justify-around">
              <Link to="/">
                <li className="mx-3 w-10/12 bg-emerald-600 rounded-md p-1">
                  Home
                </li>
              </Link>

              <Link to="/blogs">
                <li className="mx-3 w-10/12 bg-emerald-600 rounded-md p-1">
                  Blogs
                </li>
              </Link>

              <Link to="/latest">
                <li className="mx-3 w-10/12 bg-emerald-600 rounded-md p-1">
                  Latest
                </li>
              </Link>

              <Link to="/about">
                <li className="mx-3 w-10/12 bg-emerald-600 rounded-md p-1">
                  About
                </li>
              </Link>

              <Link to="/contact">
                <li className="mx-3 w-10/12 bg-emerald-600 rounded-md p-1">
                  Contact
                </li>
              </Link>

              <Link to="/admin">
                <li className="mx-3 w-10/12 bg-emerald-600 rounded-md p-1">
                  Admin
                </li>
              </Link>
            </ul>

            <div className=" font-bold bg-red-300 p-1 px-3 rounded-md">
              <Link to="/admin">Profile</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
