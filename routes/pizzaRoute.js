import express from 'express';
import pizzaModel from '../models/pizzaModel.js';
import Razorpay from 'razorpay';
import userModel from '../models/userModel.js';
const router=express.Router();

router.post('/custom-order',async(req,res)=>{
    try {
        const razorpay=new Razorpay({
                    key_id:process.env.TEST_KEY,
                    key_secret:process.env.TEST_SECRET
                })
        const {base,sauce,cheeseType,veggies,amount,currency}=req.body;
         const options={
                    amount:amount*100,
                    currency:currency,
                    receipt:`receipt_order${Date.now()}`
                }
                const user=await userModel.find();
                const custName=user.map((info)=>(info.name)).toString();
                const contact=parseInt(user.map((info)=>(info.contact)));
        await new pizzaModel({custName,contact,base,sauce,cheeseType,veggies}).save();
        const orderSaved=await razorpay.orders.create(options);
        res.status(200).json({success:true,orderSaved});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'something went wrong'
        })
    }
})

router.put('/updateCustStatus',async(req,res)=>{
    try {
        const {custId,status}=req.body;
        const updateCustStatus=await pizzaModel.findByIdAndUpdate(custId.custId,{status},{new:true});
        res.status(200).send({
            success:true,
            message:'Order updated successfully',
            updateCustStatus
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Something went wrong'
        })
    }
})


export default router;