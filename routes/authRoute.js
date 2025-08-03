import { hashPassword } from "../helpers/hashing.js";
import userModel from "../models/userModel.js";
import express from 'express';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router=express.Router();

router.post('/register',async(req,res)=>{
    try {
        const {name,email,password,contact,role}=req.body;
        if(name=="" || email=="" || password=="" || contact=="" || role==""){
            return res.status(201).send({
                message:'Enter all fields'
            })}
        const existedUser=await userModel.findOne({email});
        if(existedUser){
            return res.status(200).send({
                success:false,
                message:'Already registered.Please login'
            })
        }
        const hashedPassword=await hashPassword(password);
        const user=await new userModel({name,email,password:hashedPassword,contact,role}).save();
        return res.status(201).send({
            success:true,
            message:'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong'
        })
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {email,pw}=req.body;
        const user=await userModel.findOne({email});
        if(email=="" || pw==""){
            return res.status(201).send({
                message:'Enter email or password'
            })
        }
        if(!user){
            return res.status(200).send({
                message:'User not registered.Register first'
            })
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        if(!match){
            return res.status(201).send({
                success:false,
                message:'Incorrect password.Try again.'
            })
        }
        const token=JWT.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        return res.status(201).send({
            success:true,
            message:'Login successfully',
            user:{
                email:user.email,
                role:user.role
            },
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Something went wrong'
        })
    }
})

router.put('/forgot-pw',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(201).send({
                success:false,
                message:'no such email exist'
            })
        }
        console.log(password);
        
        const hashPw=await hashPassword(password);
        const updatedPw=await userModel.findByIdAndUpdate(user._id,{password:hashPw});
        res.status(200).send({
            success:true,
            message:'password updated successfully',
            updatedPw
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Something went wrong'
        })
    }
})

export default router;