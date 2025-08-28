import express, { json } from "express";
import route from "./router/router.js";
import connectDB from "./database/Db.js";

const app=express();
connectDB();
const port=4000;
app.use(express.json());


app.use("/api/auth",route);



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})