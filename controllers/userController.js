import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isObjectIdOrHexString } from "mongoose";

export function createUser(req,res){
    const passwordHash = bcrypt.hashSync(req.body.password,10);
    const userData={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:passwordHash
    }

    const user=new User(userData);
        
    user.save().then(
        ()=>{
            res.json({
                message:"User crateed succesfully!"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"failed to creat user!"
            })
        }
    )
}

export function loginUser(req,res){
    const email=req.body.email;
    const password=req.body.password;

    User.findOne(
        {
            email:email
        }
    ).then(
        (user)=>{
            if(user == null){
                res.status(404).json({
                    message:"user not found!"
                })
            }else{
                const isPasswordCorrect=bcrypt.compareSync(password,user.password)
                if(isPasswordCorrect){
                    const token=jwt.sign(
                        {
                            email:user.email,
                            firstName:user.firstName,
                            lastName:user.lastName,
                            role:user.role,
                            isBlocked:user.isBlocked,
                            isEmailVerfied:user.isEmailVerfied,
                            image:user.image
                        },
                        "cbc-6503"
                    )

                    res.json({
                        token:token,
                        message:"login succesfully!"
                    })
                }else{
                    res.status(403).json({
                        message:"incorrect password!"
                    })
           
                }
            }
        }
    )

}