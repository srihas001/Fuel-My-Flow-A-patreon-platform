import  mongoose from "mongoose"
const {Schema, model}=mongoose;
const Paymentschema=new Schema({
    name:{type:String},
    to_user:{type:String, required:true},
    order_id:{type:String,required:true},
    message:{type:String},
    amount:{type:Number,required:true},
    created_at:{type:Date,default:Date.now()},
    updated_at:{type:Date,default:Date.now()},
    completed:{type:Boolean,default:false}
})
export default mongoose.models.Payment || model("Payment",Paymentschema)


