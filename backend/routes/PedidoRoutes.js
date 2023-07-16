import express from "express";
import userModel from "../models/userModel.js";
import Autorizador from "../clases/Autorizador.js";
import userFacade from "../gestores/userFacade.js";
import expressAsyncHandler from "express-async-handler";
import pedidoModel from "../models/pedidoModel.js";

const pedidoRouter = express.Router();

pedidoRouter.post(
  "/",
  Autorizador.isAuth,
  expressAsyncHandler(async (req, res) => {
    const nuevoPedido = pedidoModel.iniciarPedidoModel();
    const newPedido = new nuevoPedido({
      orderItems: req.body.orderItems.map((plato) => ({
        ...plato,
        product: plato._id,
      })),
      precioItems: req.body.itemsPrice,
      precioEnvio: req.body.costEnvio,
      precioTotal: req.body.precioTotal,
      user: req.user._id,
    });

    const pedido = await newPedido.save();
    res.status(201).send({ message: "Orden creada", pedido });
  })
);

export default pedidoRouter;
