import mongoose, { connect } from "mongoose";
import "dotenv/config"

const connectDB=async()=>{
    try {
       await connect(process.env.MONGO_URL);
       console.log("server is connected to mongoDb");
    } catch (error) {
       console.log("server is not connect to mongoDB",error); 
    }
}

export default connectDB;