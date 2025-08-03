import express from 'express';
import Razorpay from 'razorpay';
const router=express.Router();
import dotenv from 'dotenv';
import orderModel from '../models/Admin model/orderModel.js';
import userModel from '../models/userModel.js';
import pizzaModel from '../models/pizzaModel.js';
dotenv.config();

router.post('/create-order',async(req,res)=>{
    try {
        const razorpay=new Razorpay({
            key_id:process.env.TEST_KEY,
            key_secret:process.env.TEST_SECRET
        })
        const {name,amount,currency}=req.body;
        const options={
            amount:amount*100,
            currency:currency,
            receipt:`receipt_order${Date.now()}`
        }
        const user=await userModel.find();
        const custName=user.map((info)=>(info.name)).toString();
        const contact=parseInt(user.map((info)=>(info.contact)));
        await new orderModel({custName,order:name,contact}).save();
        const orderSaved=await razorpay.orders.create(options);
        res.status(200).json({success:true,orderSaved});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Something went wrong'
        })
    }
})

router.get('/show-orders',async(req,res)=>{
    try {
        const delay=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
        delay(20000)
        const orderInfo=await orderModel.find();
        delay(10000);
        const custOrderInfo=await pizzaModel.find();
        res.status(200).send({orderInfo,custOrderInfo});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Something went wrong'
        })
    }
})

router.put('/updateStatus',async(req,res)=>{
    try {
        const{orderId,status}=req.body;
        console.log(orderId && orderId.orderId);
        const updateStatus=await orderModel.findByIdAndUpdate(orderId && orderId.orderId,{status},{new:true});
        res.status(200).send({
            success:true,
            message:'Status updated successfully',
            updateStatus
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Something went wrong'
        })
    }
})



export default router;