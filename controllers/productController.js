import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){
    if(!isAdmin(req)){
        return res.status(403).json({
            message:"Access denied.Admin only!"
        })
    }

    const product=new Product(req.body);
    try{
        const response=await product.save();
        res.json({
            message:"product created sucesfully!",
            product:response
        })
    }catch(error){
        console.log("error creating products",error);
        return res.status(500).json({
            message:"failed to connect to database!"
        })

    } 

}