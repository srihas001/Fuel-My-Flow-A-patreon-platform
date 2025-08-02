"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateprofile} from '@/actions/useractions'
  import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
  if (session?.user?.name) {
    getData();
  }
}, [session]);

useEffect(() => {
  if (session === null) {
    router.push('/login');
  }
}, [session]);

    const getData=async(e)=>{
        let a=await fetchuser(session.user.name)
        setform(a)
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit=async(e)=>{
        update()
        let a=await updateprofile(e,session.user.name)  
        toast('profile updated', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
    }
    return (
      <>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  <div className='container mx-auto py-5 px-6 '>
    <h1 className='text-center my-5 text-3xl font-bold text-purple-600'>Welcome to your Dashboard</h1>

    <form className="max-w-2xl mx-auto" action={handleSubmit}>

      <div className='my-2'>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-500">Name</label>
        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-white placeholder-gray-300 border border-purple-500 rounded-lg bg-gray-800 text-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>

      <div className="my-2">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-500">Email</label>
        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-white placeholder-gray-300 border border-purple-500 rounded-lg bg-gray-800 text-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>

      <div className='my-2'>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-purple-500">Username</label>
        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-white placeholder-gray-300 border border-purple-500 rounded-lg bg-gray-800 text-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>

      <div className="my-2">
        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-purple-500">Profile Picture</label>
        <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-white placeholder-gray-300 border border-purple-500 rounded-lg bg-gray-800 text-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>

      <div className="my-2">
        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-purple-500">Cover Picture</label>
        <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-white placeholder-gray-300 border border-purple-500 rounded-lg bg-gray-800 text-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>

      <div className="my-2">
        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-purple-500">Razorpay Id</label>
        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 text-white placeholder-gray-300 border border-purple-500 rounded-lg bg-gray-800 text-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>

      <div className="my-2">
        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-purple-500">Razorpay Secret</label>
        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-white placeholder-gray-300 border border-purple-500 rounded-lg bg-gray-800 text-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>

      <div className="my-6">
        <button type="submit" className="block w-full p-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-pink-500 focus:ring-4 focus:outline-none dark:focus:ring-pink-800 font-medium text-sm">Save</button>
      </div>
    </form>
  </div>
</>
    )
}

export default Dashboard