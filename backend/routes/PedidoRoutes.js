import express from "express";
import Autorizador from "../clases/Autorizador.js";
import pedidoModel from "../models/pedidoModel.js";
import verificarAdmin from "../clases/verificarAdmin.js";
import pedidoFacade from "../gestores/pedidoFacade.js";

const pedidoRouter = express.Router();

const PedidoFacade = await pedidoFacade.getInstance(pedidoModel);

pedidoRouter.post(
  "/",
  Autorizador.isAuth,
  PedidoFacade.crearPedido
);
pedidoRouter.put(
  "/:id/pagado",
  Autorizador.isAuth,
  PedidoFacade.confirmarPago
);
pedidoRouter.put(
  "/:id/entregado",
  Autorizador.isAuth,
 PedidoFacade.confirmarEntrega
);
pedidoRouter.get(
  "/",
  Autorizador.isAuth,
  verificarAdmin.esAdmin,
  PedidoFacade.obtenerPedidos
);

export default pedidoRouter;
