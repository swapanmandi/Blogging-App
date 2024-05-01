import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <div className=' bg-stone-50 text-slate-950'>
        <ol className=' flex  justify-center'>
        <li className=' p-4'><Link to="/dashboard">Home</Link></li>
            <li className=' p-4'> <Link to="/dashboard/signup">SignUp</Link></li>
            <li className=' p-4'><NavLink to="/dashboard/login">LogIn</NavLink></li>
            <li className=' p-4'><Link to="/">Go to Site</Link></li>
        </ol>
    </div>
    
    </>
  )
}
