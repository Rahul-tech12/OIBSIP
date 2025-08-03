import mongoose from "mongoose";
const pizzaSchema=new mongoose.Schema({
    custName:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    base:{
        type:String,
        required:true
    },
    sauce:{
        type:String
    },
    cheeseType:{
        type:String,
        required:true
    },
    veggies:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Ordered'
    }
},{timestamps:true})

export default mongoose.model('custom-orders',pizzaSchema);