import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <>
        <nav className=" bg-red-200 w-full h-16 items-center flex justify-evenly text-md text-blue-600">
        <div className=" font-bold uppercase">
            Blogging App
        </div>
            <ul className="flex font-semibold ">
                <li className="mx-[10px]"><Link to="/">Home</Link></li>
                <li className="mx-[10px]"> <Link to="/blogs">Blogs</Link></li>
                <li className="mx-[10px]"><Link to="/latest">Latest</Link></li>
                <li className="mx-[10px]"> <Link to="/about">About</Link></li>
                <li className="mx-[10px]"><Link to="/contact">Contact</Link></li>
            </ul>
            <div className=" font-bold bg-red-300 p-1 px-3 rounded-md"> <Link to="/dashboard">Admin</Link> </div>
        </nav>
        </>
    )
}
export default Navbar;