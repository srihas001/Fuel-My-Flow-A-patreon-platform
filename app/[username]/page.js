import Paymentpage from '@/components/Paymentpage'
import connectDB from '@/db/connectDB';
import { notFound } from 'next/navigation';
import User from '@/models/User';
const Username=async ({params})=>{
    const checkuser=async()=>{
        await connectDB()
        let u=await User.findOne({username:params.username})
        if(!u){
            return notFound()
        }
    }
   await checkuser()
   return(
    <>
    <Paymentpage username={params.username}/>
    </>
   )
}
export default Username