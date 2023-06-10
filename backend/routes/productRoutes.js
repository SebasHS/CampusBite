import express from "express";
import productModel from "../models/productModel.js";
import productFacade from "../gestores/productFacade.js";

const productRouter = express.Router();

const productFacade = await productFacade.getInstance(productModel);

productRouter.get("/", productFacade.getTodos);
userRouter.post("/register", userGest.register);
userRouter.put("/profile", Autentificador.isAuth, userGest.edit);

export default productRouter;