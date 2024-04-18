import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <div>
        <ol>
            <li> <Link to="/dashboard/signup">SignUp</Link></li>
            <li><NavLink to="/dashboard/login">LogIn</NavLink></li>
        </ol>
    </div>
    
    </>
  )
}
