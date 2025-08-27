import express from "express";
import { auth, logged } from "../middleWere/middleWere.js";

const route=express.Router();

route.get("/",logged,auth,(req,res)=>{
    res.status(200).json({message:"fetch user successfully"});
   
})
route.post("/create",(req,res)=>{
    res.status(200).json({message:"create user successfully"});
})
route.put("/:id",(req,res)=>{
    res.status(200).json({message:"update user successfully"});
})
route.delete("/:id",(req,res)=>{
    res.status(200).json({message:"delete user successfully"});
})


export default route;