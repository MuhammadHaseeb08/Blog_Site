import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetUser } from '../../store/store'


const NavBar = () => {
  let [auth,setAuth]=useState(true)
  let data = useSelector((store) => {
    return store.user
  })
  let nevigate=useNavigate()
 useEffect(() => {
  if (data._id=="") {
    setAuth(!auth)
  }
 }, [setAuth])
  // console.log(data);
  // console.log(auth);
  let dispatch=useDispatch()

  return (
    <div className=' bg-inherit   '>
      <header class="text-gray-600 body-font backdrop-blur-lg bg-white/20 ">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg> */}
            <Link to="/"><span class="ml-3 text-white text-2xl">BLOGS</span></Link>
          </a>
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center  justify-center text-2xl ">

            <Link to="/crypto"><div class="mx-5 text-white">Cryptocurrencies</div></Link>
            <Link to="/create"><div class="mx-5 text-white">Submit a blog</div></Link>

          </nav>
         

          {

            data._id==""?


            <div> <Link to="/signUp"><button class="inline-flex items-center bg-blue-700 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:text-black rounded text-base mt-4 md:mt-0 text-white font-bold">Sign in
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button></Link>
          <Link to="/login"><button class="inline-flex items-center bg-green-700 border-0 py-1 ml-6 px-3 focus:outline-none hover:bg-gray-200 hover:text-black rounded text-base mt-4 md:mt-0 text-white font-bold"><div>Login</div>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button></Link></div>:
            
            
            <div><button onClick={()=>{
              dispatch(resetUser())
              setAuth(!auth)
              nevigate("/login")
            }} class="inline-flex items-center bg-red-700 border-0 py-1 ml-6 px-3 focus:outline-none hover:bg-gray-200 hover:text-black rounded text-base mt-4 md:mt-0 text-white font-bold"><div>LogOut</div>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button></div>
          
          
          
        
          }
        </div>
      </header>
    </div>
  )
}

export default NavBar