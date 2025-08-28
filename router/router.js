import express from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken"
import "dotenv/config"
import fetchUser from "../middleWere/fetchUser.js";

const route=express.Router();

route.get("/",(req,res)=>{
    res.status(200).json({message:"fetch user successfully"});
   
})

route.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        if(!name || !email || !password){
            res.status(400).json({message:"all fields are required"});
        }
        if(!email.includes("@")){
            res.status(400).json({message:"invalid email"});
        }
        const user=await User.findOne({email});
        if(user){
            res.status(400).json({message:"user alredy exists"});
        }
        const salt =await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newUser=await User({
            name,
            email,
            password:hashedpassword
        })
        await newUser.save();
        res.status(200).json({success:true,message:"user registered successfully",newUser})
    } catch (error) {
      res.ststud(500).json({message:"internal server error"});  
    }
})

route.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password){
            res.status(400).json({message:"all fields are required"});
        }
        if(!email.includes("@")){
            res.status(400).json({message:"invalid email"});
        }
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({message:"user not Found"});
        }
        
        const isMatch=await bcrypt.compare(password,user.password);

        if(isMatch){
            const token=jwt.sign({userId:user.id},process.env.JWT_SECRET,{
                expiresIn:'7d'
            })
            res.status(200).json({success:true,message:"user logged in successfully",token})
        }
    } catch (error) {
      res.ststud(500).json({message:"internal server error"});  
    }
})

route.get('/getuser',fetchUser,async(req,res)=>{
    try {
       const userId=req.userId;
       const user=await User.findById(userId).select("-password");
       res.status(200).json({success:true,user});
    } catch (error) {
       res.status(500).json({error:"internal server error"}); 
    }
})

route.get('/getalluser',async(req,res)=>{
    try {
       const user=await User.find().select("-password");
       res.status(200).json({success:true,user});
    } catch (error) {
       res.status(500).json({error:"internal server error"}); 
    }
})


export default route;