import mongoose from "mongoose";
const stockSchema=new mongoose.Schema({
    base:{
        type:Map,
        of:Number,
        default:{}
    },
    sauce:{
        type:Map,
        of:Number,
        default:{}
    },
    cheeseType:{
        type:Map,
        of:Number,
        default:{}
    },
    veggies:{
        type:Map,
        of:Number,
        default:{}
    }
},{timestamps:true})

export default mongoose.model('cust-stock',stockSchema);