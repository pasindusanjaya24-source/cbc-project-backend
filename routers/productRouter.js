import express from "express";
import { createProduct, deleteProducts, getProductInfo, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter=express.Router();
productRouter.post("/",createProduct);
productRouter.get("/",getProducts);
productRouter.get("/:productId",getProductInfo);
productRouter.delete("/:productId",deleteProducts);
productRouter.put("/:productId",updateProduct);


export default productRouter;