import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  const logout=()=>{
    setToken('')
    localStorage.removeItem("token")
     window.location.href = "http://localhost:5173/";   

  }
  return (
    <div className=' flex items-center justify-between py-2 px-44'>
        <img className='w-36 'src={assets.logo} alt="" />
        <button onClick={logout} className='bg-gray-600 text-white rounded-full px-8 hover:bg-red-400  sm:py-2 sm:Px-7'>LogOut</button>
      
    </div>
  )
}

export default Navbar
