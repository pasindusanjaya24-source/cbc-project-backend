import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routers/productRouter.js";

const app = express();
app.use(bodyParser.json());
app.use(
    (req,res,next)=>{
        const value=req.header("Authorization");
        if(value != null){
             const token=value.replace("Bearer ","");
             jwt.verify(token,"cbc-6503",
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


const connecetionString="mongodb+srv://pasindusanjaya24_db_user:psb123@cluster0.y1k077q.mongodb.net/?appName=Cluster0"
mongoose.connect(connecetionString).then(
    ()=>{
        console.log("database connected !")
    }
).catch(
    ()=>{
        console.log("database connecton is failed")
    }
)
app.use("/users",userRouter)
app.use("/products",productRouter)

app.delete("/",
    (req,res)=>{
        console.log(req.body)
        res.json(
            {
                message:"this is response for delete"
            }

        )
        console.log("this is delete request")
    }

)

app.put("/",
    (req,res)=>{
        console.log(req.body)
        res.json(
            {
                message:"this response for put equest"
            }
        )
        console.log("thiss is a put request")
    }

)

app.listen(5000,()=>{
    console.log("server is started!")
})