"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'
const Navbar = () => {
     const { data: session } = useSession();
     const [showdropdown, setShowDropdown] = useState(false);
     const handleDropdown = () => {
         setShowDropdown(!showdropdown);
     };
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }
  return (
   <nav className='flex justify-between items-center md:h-16 p-3 bg-gray-800 text-white'>
        <div className='text-xg font-bold'>
            <Link href="/" className='flex justify-center items-center gap-2'> <span><img width={30} src="2a524376-a7db-46d3-8d3d-98a0b5426c0e.svg" alt="" /></span>FuelMyFlow!</Link>
        </div>

            {/* <ul className='flex justify-between items-center gap-5'>
                <Link href="/"><li>Home</li></Link>
                <Link href="/about"><li>About</li></Link>
                <Link href="/projects"><li>Projects</li></Link>
                <Link href="/signup"><li>Sign Up</li></Link>
                <Link href="/login"><li>Login</li></Link>
            </ul> */}
            <div className='relative'>
                {session && <>
<button 
  id="dropdownDefaultButton"
  onClick={() => handleDropdown()} onBlur={()=>{setTimeout(() => {setShowDropdown(false);}, 300);}}
  data-dropdown-toggle="dropdown"
  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mx-4 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center"
  type="button"
>
  Welcome {session.user.email}
  <svg
    className="w-2.5 h-2.5 ms-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 1 4 4 4-4"
    />
  </svg>
</button>
<div id="dropdown" className={`z-10  ${showdropdown?"":"hidden"} absolute left-[150px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
      </li>
      <li>
        <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
      </li>
      <li>
        <Link href="#" onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
      </li>
    </ul>
</div>
</>
}
             {!session && <Link href="/login"><button className='cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2'>Login</button></Link>}
            </div>
    </nav>
  )
}

export default Navbar
