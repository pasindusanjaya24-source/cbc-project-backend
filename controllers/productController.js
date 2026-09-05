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

export async function getProducts(req,res){
    try{
        if(isAdmin(req)){
            const products=await Product.find();
            res.json(products);
            return;
        }else{
            const products=await Product.find({isAvailable:true});
            res.json(products);
            return;

        }
            

    }catch(error){
        console.error("error fetching products",error);
        res.status(500).json({message:"failed to fetch products!"});
        return;
    }
}

export async function deleteProducts(req,res) {
    if(!isAdmin(req)){
        res.status(403).json({message:"Access denied!.admin only"});
        return;
    }
    try{
        const productId= req.params.productId;
        await Product.deleteOne({
            productId:productId
        })
        res.json({message:"product deleted succesfull!"});
    }catch(error){
        console.error("error delete products",error);
        res.status(500).json({message:"failed to delete product"});
        return;

    }
    
}
export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({message:"Access denied!.Admin only"});
        return;
    }
    const data =req.body;
    const productId=req.params.productId;
    data.productId=productId;
    try{
        await Product.updateOne(
            {
            productId:productId,
        }, data
    );
    res.json({message:"product updated succesfully!"});

    }catch(error){
        console.error("error delete products",error);
        res.status(500).json({message:"failed update product"});
        return;
    }
}

export async function getProductInfo(req,res){
    try{
        const productId=req.params.productId;
        const product=await Product.findOne({productId:productId});
        if(product==null){
            res.status(404).json({message:"produuct not found!"});
            return;
        }
        if(isAdmin(req)){
            res.json(product);
        }else{
            if(product.isAvailable){
                res.json(product);

            }else{
                res.status(404).json({message:"Access denied!.product is not available!"});
            }
        }

    }catch(error){
        console.error("error fetching product info",error);
        res.status(500).json({message:"failed to fetch product info!"});
    }
}

