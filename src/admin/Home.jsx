import React from 'react'
import Dashboard from './Dashboard.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'


export default function Home() {
  return (
    <>
    
     <Navbar />
    
      <Outlet />
      <Footer />
   
      
    </>
  )
}
