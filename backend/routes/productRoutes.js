import express from "express";
import productModel from "../models/productModel.js";
import productFacade from "../gestores/productFacade.js";
import expressAsyncHandler from "express-async-handler";
import Autorizador from "../clases/Autorizador.js";
import verificarAdmin from "../clases/verificarAdmin.js";
const PAGE_SIZE = 10;

const productRouter = express.Router();

const ProductFacade = await productFacade.getInstance(productModel);

productRouter.get("/categories", ProductFacade.getCategorias);

productRouter.get(
  "/admin",
  Autorizador.isAuth,
  //verificarAdmin.esAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await productModel
      .iniciarProductModel()
      .find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await productModel
      .iniciarProductModel()
      .countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get("/", ProductFacade.getTodos);
productRouter.get("/search", ProductFacade.getFiltros);
productRouter.get("/:id", ProductFacade.getPorId);
productRouter.get("/slug/:slug", ProductFacade.getPorSlug);

export default productRouter;
