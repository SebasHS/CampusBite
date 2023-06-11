import express from "express";
import productModel from "../models/productModel.js";
import productFacade from "../gestores/productFacade.js";

const productRouter = express.Router();

const ProductFacade = await productFacade.getInstance(productModel);

productRouter.get("/", ProductFacade.getTodos);

export default productRouter;
