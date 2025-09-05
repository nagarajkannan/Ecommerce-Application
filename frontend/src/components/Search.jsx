import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const {search,setSearch,showsearch,setShowSearch}=useContext(Shopcontext);
    const location=useLocation();
    const [visible,setVisible]=useState(false)
    useEffect(()=>{
     if(location.pathname.includes('collections')){
            setVisible(true)
     }
     else{
        setVisible(false)
     }
     
    },[location])
  return showsearch && visible? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 my-5 rounded-full w-3/4 sm:w-1/2'>
            <input className='flex-1 outline-none bg-inherit text-sm' value={search} placeholder='search' onChange={(e)=>{setSearch(e.target.value)}} type="text" />
            <img  className='w-4' src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=>{setShowSearch(false)}} className='inline w-4 cursor-pointer' src={assets.cross_icon} alt="" />
      
    </div>
  ):null
}

export default Search
