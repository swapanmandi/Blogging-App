import React from 'react'

export default function Login() {
  return (
    <div className=' bg-slate-400 h-screen'>
    <div className=' flex flex-col text-slate-950'>
    <h1 className=' m-3'>LogIn Goes Here</h1>
    <label className=' m-5 text-black'>Username: <input placeholder='Enter Username'></input></label>
    
    <label className=' m-5'>Password:  <input placeholder='Enter Password'></input></label>
  <label> <button className=' bg-red-400 rounded-md p-2 m-3'>Login</button> </label>
  </div>
  </div>
  )
}
