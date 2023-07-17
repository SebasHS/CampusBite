import express from "express";
import productModel from "../models/productModel.js";
import productFacade from "../gestores/productFacade.js";
import Autorizador from "../clases/Autorizador.js";
import verificarAdmin from "../clases/verificarAdmin.js";

const productRouter = express.Router();

const ProductFacade = await productFacade.getInstance(productModel);

productRouter.get("/categories", ProductFacade.getCategorias);

productRouter.get(
  "/admin",
  Autorizador.isAuth,
  verificarAdmin.esAdmin,
  ProductFacade.getAdminProds
);

productRouter.get("/", ProductFacade.getTodos);
productRouter.get("/search", ProductFacade.getFiltros);
productRouter.get("/:id", ProductFacade.getPorId);
productRouter.get("/slug/:slug", ProductFacade.getPorSlug);

productRouter.post(
  "/",
  Autorizador.isAuth,
  verificarAdmin.esAdmin,
  ProductFacade.putCrearProducto
);
productRouter.put(
  "/:id",
  Autorizador.isAuth,
  verificarAdmin.esAdmin,
  ProductFacade.putEditarProducto
);

export default productRouter;
