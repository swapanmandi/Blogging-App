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
      <nav className=" bg-red-200 w-full h-16 items-center flex justify-evenly text-md text-blue-600">
        <div className=" font-bold uppercase">Blogging App</div>
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
        <input
          type="checkbox"
          value=""
          onChange={handleMode}
          checked={themeMode === "dark"}
        />
      </nav>
    </>
  );
};
export default Navbar;
