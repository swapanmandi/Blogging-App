import { useContext } from "react";
import { Link } from "react-router-dom";

import useTheme from "../store/ThemeContext";

const Navbar = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const handleMode = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <>
      <nav className=" relative bg-lime-400 overflow-hidden w-screen h-16 items-center flex justify-evenly text-md text-blue-600">
        <Link to="/">
          <div className=" font-bold uppercase">Blogging App</div>
        </Link>
        <ul className="flex font-semibold ">
          <li className="mx-[10px]">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-[10px]">
            {" "}
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="mx-[10px]">
            <Link to="/latest">Latest</Link>
          </li>
          <li className="mx-[10px]">
            {" "}
            <Link to="/about">About</Link>
          </li>
          <li className="mx-[10px]">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className=" font-bold bg-red-300 p-1 px-3 rounded-md">
          {" "}
          <Link to="/dashboard">Admin</Link>{" "}
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
      </nav>
    </>
  );
};
export default Navbar;
