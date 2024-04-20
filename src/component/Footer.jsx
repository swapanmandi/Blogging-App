import React, { useContext} from 'react'
import {PostContext} from '../store/PostContext';


export default function Footer() {
 
  return (
    <>
    <footer className=" bg-red-200 w-full h-60 flex justify-between px-8">
      <div className=' text-black'><h3 className=' font-semibold'>Menu</h3>
      <div className=' bg-white h-[2px] w-12'></div>
      <ul>
        <li>About</li>
        <li>Blogs</li>
        <li>Latest</li>
      </ul>
      </div>

      <div className=' text-black flex flex-col'><h3 className=' font-semibold'>Latest Blogs</h3>
      <div className=' bg-white h-[2px] w-15'></div>
      <ul className=' items-center flex flex-col'>
        <li>About</li>
        <li>Blogs</li>
        <li>Latest</li>
      </ul>
      </div>

      <div className=' text-black flex flex-col'><h3 className=' font-semibold'>Scocial</h3>
      <div className=' bg-white h-[2px] w-12'></div>
      <ul>
        <li>About</li>
        <li>Blogs</li>
        <li>Latest</li>
      </ul>
      </div>
    </footer>
    </>
  )
}
