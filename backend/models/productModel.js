import mongoose from "mongoose";

export default class productModel {
  //Clase Producto que genera el modelo para MongoDB
  constructor() {}
  static iniciarProductModel() {
    const productSchema = new mongoose.Schema(
      {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        dealership: { type: mongoose.ObjectId, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        description: { type: String, required: true },
        WeekDay: { type: [Number], required: true },
      },
      {
        timestamps: true,
      }
    );

    const Product =
      mongoose.models.Product || mongoose.model("Product", productSchema);
    return Product;
  }
}
