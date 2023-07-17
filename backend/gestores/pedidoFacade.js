import expressAsyncHandler from "express-async-handler";
import pedidoModel from "../models/pedidoModel.js";
import FacadeFactory from "./FacadeFactory.js";


export default class pedidoFacade extends FacadeFactory {
    // Fachada de las rutas utilizadas por la clase Producto
    instance;
    facadeModel;
  
    constructor(facadeModel) {
      super();
      this.facadeModel = facadeModel;
    }
  
    // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
    static async getInstance(facadeModel) {
      if (this.instance == null) {
        this.instance = new pedidoFacade(facadeModel);
        return this.instance;
      } else {
        return this.instance;
      }
    }
    crearPedido= expressAsyncHandler(async (req, res) => {
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

    confirmarPago = expressAsyncHandler(async (req, res) => {
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
      confirmarEntrega =  expressAsyncHandler(async (req, res) => {
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
      obtenerPedidos = expressAsyncHandler(async (req, res) => {
        const pedidos = await pedidoModel
          .iniciarPedidoModel()
          .find()
          .populate("user");
        res.send(pedidos);
      })
}