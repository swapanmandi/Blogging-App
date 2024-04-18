import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <>
        <div className="container">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li> <Link to="/blogs">Blogs</Link></li>
                <li><Link to="/latest">Latest</Link></li>
                <li> <Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/dashboard">Admin</Link></li>
            </ul>
        </div>
        </>
    )
}
export default Navbar;