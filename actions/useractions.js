"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db/connectDB";
import { connect } from "mongoose";
import { notFound } from "next/navigation";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
   let user=await User.findOne({username:to_username})
const secret=user.razorpaysecret
  const instance = new Razorpay({
    key_id:user.razorpayid,
    key_secret: secret,
  });

  const options = {
    amount: Number.parseInt(amount) * 100, 
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options); 
    console.log("Razorpay order created:", order);

    await Payment.create({
      order_id: order.id,
      amount,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });

    return order;
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    throw new Error("Failed to create Razorpay order");
  }
};
export const fetchuser=async(username)=>{
    await connectDB()
    let u=await User.findOne({username :username})
    let user=u.toObject({flattenObjectIds:true})
    return user
}
export const fetchpayments = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username })
    .sort({ amount: -1 })
    .lean();
  return p;
};
export const updateprofile=async(data,oldusername)=>{
    await connectDB()
    let ndata=Object.fromEntries(data)
    if(oldusername!==ndata.username){
    let u= await User.findOne({username:ndata.username})
    if(u){
        return {error:"username already exists"}
    }
     await User.updateOne({email:ndata.email},ndata)
    await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})

    }
    await User.updateOne({email:ndata.email},ndata)
}