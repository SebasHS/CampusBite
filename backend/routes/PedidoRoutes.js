import express from "express";
import userModel from "../models/userModel.js";
import Autorizador from "../clases/Autorizador.js";
import userFacade from "../gestores/userFacade.js";
import expressAsyncHandler from "express-async-handler";
import pedidoModel from "../models/pedidoModel.js";
import verificarAdmin from "../clases/verificarAdmin.js";

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
pedidoRouter.put(
  "/:id/pagado",
  Autorizador.isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await pedidoModel
      .iniciarPedidoModel()
      .findById(req.params.id);
    if (order) {
      order.isPaid = true;
      await order.save();
      res.send({ message: "Pedido pagado" });
    } else {
      res.status(404).send({ message: "Pedido no encontrado" });
    }
  })
);
pedidoRouter.put(
  "/:id/entregado",
  Autorizador.isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await pedidoModel
      .iniciarPedidoModel()
      .findById(req.params.id);
    if (order) {
      order.isEntregado = true;
      await order.save();
      res.send({ message: "Pedido entregado" });
    } else {
      res.status(404).send({ message: "Pedido no encontrado" });
    }
  })
);
pedidoRouter.get(
  "/",
  Autorizador.isAuth,
  verificarAdmin.esAdmin,
  expressAsyncHandler(async (req, res) => {
    const User = userModel.iniciarUserModel();
    const orders = await pedidoModel
      .iniciarPedidoModel()
      .find()
      .populate("user");
    res.send(orders);
  })
);

export default pedidoRouter;
