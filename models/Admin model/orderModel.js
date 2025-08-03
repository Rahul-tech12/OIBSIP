import mongoose from "mongoose";

const orderSchema=await mongoose.Schema({
    custName:{
        type:String,
        required:true,
    },
    order:{
        type:[String],
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'Ordered'
    }
},{timestamps:true})

export default mongoose.model('order',orderSchema);