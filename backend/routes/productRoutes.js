import express from "express";
import productModel from "../models/productModel.js";
import productFacade from "../gestores/productFacade.js";
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

const ProductFacade = await productFacade.getInstance(productModel);

productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
      const categories = await productModel.iniciarProductModel().find().distinct('category');
      res.send(categories);
    })
  );

productRouter.get("/", ProductFacade.getTodos);
productRouter.get("/:id", ProductFacade.getPorId);
productRouter.get("/slug/:slug", ProductFacade.getPorSlug);

export default productRouter;
