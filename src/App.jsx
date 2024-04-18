import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { Outlet } from 'react-router-dom'


function App() {
  
  return (
    <PostContextProvider>
    <>
      <Navbar/>
      <Outlet />
      <Footer />
    </>  
    </PostContextProvider>
    )
}

export default App
