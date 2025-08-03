import express from 'express';
import {authMiddleware,adminOnly} from '../middlewares/authMiddleware.js';
const router=express.Router();


router.get('/user-dashboard',authMiddleware,(req,res)=>{
    res.json({message:`Welcome,${req.user.role}`})
})
router.get('/admin-dashboard',authMiddleware,adminOnly,(req,res)=>{
    res.json({message:`Welcome,${req.user.role}`})
})

export default router;