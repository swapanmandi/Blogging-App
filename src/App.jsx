import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { Outlet } from 'react-router-dom'
import PostContextProvider from './store/PostContext'


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
