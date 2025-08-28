import jwt from "jsonwebtoken";
import "dotenv/config";

const fetchUser=(req ,res ,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({error:"please authanticate using a valid token"});        
    }
    try {
        const {userId}= jwt.verify(token,process.env.JWT_SECRET);
        req.userId=userId;
        next();
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }

}

export default fetchUser;