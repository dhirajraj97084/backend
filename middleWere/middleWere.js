const logged=(req,res,next)=>{
    res.status(200).json({message:"login toh kar lo pahle"});
     console.log("login to kro pahle");
     next();
}

const auth=(req,res,next)=>{
    res.status(200).json({message:"authanticate toh kar lo pahle"});
    console.log("authanticate to karo pahle");
    next();
}

export {logged,auth};