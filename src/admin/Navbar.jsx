import axios from 'axios';
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";



export default function Navbar() {

  const handleLogout = async () =>{
    try {
      const response = await axios.post("http://localhost:3000/signout",{},{
        withCredentials: true
      })
      toast(response.data.data.message)
    } catch (error) {
      console.log("Error to log out", error)
      toast(error?.message)
    }
  }
  return (
    <>
    <div className=' bg-slate-800 text-white'>
        <ol className=' flex  justify-center'>
        <li className=' p-4'><Link to="/admin">Home</Link></li>
            <li className=' p-4'> <Link to="/admin/signup">SignUp</Link></li>
            <li className=' p-4'><NavLink to="/admin/login">LogIn</NavLink></li>
            <li className=' p-4 cursor-pointer' onClick={handleLogout}>LogOut</li>
            <li className=' p-4'><Link to="/">Go to Site</Link></li>
        </ol>
        <ToastContainer />
    </div>
    
    </>
  )
}
