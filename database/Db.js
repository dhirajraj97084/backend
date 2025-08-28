import mongoose, { connect } from "mongoose";


const connectDB=async()=>{
    try {
       await connect('mongodb+srv://dhirajraj97084:practice123@cluster0.mreh9ol.mongodb.net/');
       console.log("server is connected to mongoDb");
    } catch (error) {
       console.log("server is not connect to mongoDB",error);
    }
}

export default connectDB;