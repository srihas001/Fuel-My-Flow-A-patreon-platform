"use client"
import React,{useState,useEffect, use} from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { fetchuser } from '@/actions/useractions'
import { fetchpayments } from '@/actions/useractions'
 import { ToastContainer, toast } from 'react-toastify';
 import { useSearchParams } from 'next/navigation'
 import { useRouter } from 'next/navigation'
const Paymentpage = ({username}) => {
  const [paymentform, setpaymentform] = useState({name:"",message:"",amount:""})
  const [currentuser, setcurrentuser] = useState({})
  const [payments,setpayments]=useState([])
  const searchparams=useSearchParams()
  const router=useRouter()
  const handlechange=(e)=>{
    setpaymentform({...paymentform,[e.target.name]:e.target.value})
  }
  useEffect(() => {
  getData();
}, []);
useEffect(() => {
 if(searchparams.get("paymentdone")=="true"){
  toast('Payment sent successfully', {
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
 router.push(`/${username}`)
}, [])

  const getData=async(params)=>{
    let u=await fetchuser(username)
    setcurrentuser(u);
    let dbpayments=await fetchpayments(username)
    setpayments(dbpayments)
  }
     const pay=async(amount)=>{
      let a=await initiate(amount,username,paymentform)
      let orderId=a.id
      var options = {
    "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
    "amount":amount, // Amount is in currency subunits. 
    "currency": "INR",
    "name": "Animations", //your business name
    "description": "Animated logos",
    "image": "https://example.com/your_logo",
    "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
    rzp1.open();
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
   <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

    <>
    <div className='cover w-full bg-red-50 relative'>
        <img className='object-cover w-full h-[350px]' src="Gif Test212.gif" alt="notfound" />
    </div>
    <div className='absolute right-[46%] bottom-[38%] border-white border-2 rounded-lg'>
        <img width={105} height={105} src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10292992/ecf38d67272e45ec83334ce4c5ff4053/eyJoIjozNjAsInciOjM2MH0%3D/2.gif?token-hash=tw656Cf1o-720Fg_d2yhI59RNINdBvl-aYzxwapE1RA%3D&token-time=1755129600" alt="" />
    </div>
    <div className="info flex items-center justify-center flex-col gap-2 my-16">
        <div className='text-lg font-bold'>
            @{username}
        </div>
        <div className='text-slate-400'>
           lets help {username} to fuel the flow 
        </div>
        <div className='text-slate-400'>
          {payments.length} Payments. {currentuser.name} has raised ₹{payments.reduce((a,b)=>a+b.amount,0)}
        </div>
        <div className='payspace w-[80%] flex gap-4 mt-10'>
            <div className='supporters w-1/2 bg-gray-800 text-white rounded-lg p-8'>
            <h2 className='text-2xl font-bold'>Supporters</h2>
           <ul className='mx-4'>
  {payments.map((p, i) => (
      <li key={i} className='my-2'>
        {p.name} donated ₹{p.amount} with the message "{p.message}"
      </li>
    ))}
</ul>
            </div>
            <div className='payment w-1/2 bg-gray-800 rounded-lg p-8 py-10'>
            <h2 className='text-2xl font-bold'>Make a Payment</h2>
            <div className='flex gap-3 my-5 flex-col'>
                <input onChange={handlechange} value={paymentform.name} name='name' type="text" className='w-full rounded-lg p-3 bg-slate-950' placeholder='Enter Name' />
                <input onChange={handlechange} value={paymentform.message} name='message' type="text" className='w-full rounded-lg p-3 bg-slate-950' placeholder='Enter Message' />
                <input onChange={handlechange} value={paymentform.amount} name='amount' type="text" className='w-full rounded-lg p-3 bg-slate-950' placeholder='Enter Amount' />
              <button 
  onClick={() => {
    const amt = Number.parseInt(paymentform.amount);
    if (!amt || amt <= 0) return alert("Enter a valid amount");
    pay(amt);
  }} 
  type="button" 
  className="cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
>
  Pay
</button>


            </div>
            <div className='options'>
                 <button onClick={()=>{pay(10)}} type="button" class="cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
  Pay ₹10
</button>
 <button onClick={()=>{pay(20)}} type="button" class="cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
  Pay ₹20
</button>
 <button onClick={()=>{pay(30)}} type="button" class="cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
  Pay ₹50
</button>
            </div>
            </div>
        </div>
         
    </div>
    </>

   </>
  )
}

export default Paymentpage
