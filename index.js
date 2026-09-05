import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
    (req,res,next)=>{
        const value=req.header("Authorization");
        if(value != null){
             const token=value.replace("Bearer ","");
             jwt.verify(token,process.env.JWT_SECRET,
                (err,decode)=>{
                    if(decode==null){
                        res.status(403).json({
                            message:"unothrized!"
                        })
                    }else{
                        req.user=decode;
                        next();
                    }
                }
             )
        }else{
            next();
        }
    }
)


const connecetionString=process.env.MONGO_URI;
mongoose.connect(connecetionString).then(
    ()=>{
        console.log("database connected !")
    }
).catch(
    ()=>{
        console.log("database connecton is failed")
    }
)
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(5000,()=>{
    console.log("server is started!")
})