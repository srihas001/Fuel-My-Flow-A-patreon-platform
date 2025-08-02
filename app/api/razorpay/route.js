import { NextResponse } from "next/server";
import { validatePaymentVerification, validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
export const POST=async(req)=>{
    await connectDB()
    let body=await req.formData()

    body=Object.fromEntries(body)
    let p=await Payment.findOne({order_id:body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success:false, message:"No order found"})
    }
   let user = await User.findOne({username: p.to_user})
    const secret = user.razorpaysecret
    let testing=validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,secret)
    if(testing){
        const updatedpayment=await Payment.findOneAndUpdate({order_id:body.razorpay_order_id},{completed:true},{new:true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedpayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success:false,message:"Payment verification failed"})
    }
}
