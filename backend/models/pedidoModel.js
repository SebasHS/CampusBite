import mongoose from "mongoose";
//Clase Pedido que genera el modelo para MongoDB

export default class pedidoModel {
  constructor() {}
  static iniciarPedidoModel() {
    const pedidoSchema = new mongoose.Schema(
      {
        orderItems: [
          {
            name: { type: String, required: true },
            slug: { type: String, required: true },
            category: { type: String, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            dealership: { type: String, required: true },
            weekDay: { type: [Number] },
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            },
          },
        ],
        precioItems: { type: Number, required: true },
        precioEnvio: { type: Number, required: true },
        precioTotal: { type: Number, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        isPaid: { type: Boolean, default: false },
        isEntregado: { type: Boolean, default: false },
      },
      {
        timestamps: true,
      }
    );

    const Pedido =
      mongoose.models.Pedido || mongoose.model("Pedido", pedidoSchema);
    return Pedido;
  }
}
