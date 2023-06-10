import mongoose from "mongoose";

export default class productModel {
    constructor() {}
    static iniciarProductModel() {
      const productSchema = new mongoose.Schema(
        {
          name: { type: String, required: true, unique: true },
          slug: { type: String, required: true, unique: true },
          category: { type: String, required: true },
          image: { type: String, required: true },
          price:  { type: Number, required: true },
          countInStock: { type: Number, required: true },
          dealership: { type: String, required: true },
          rating: { type: Number, required: true },
          numReviews: { type: Number, required: true },
          description: { type: String, required: true },
        },
        {
          timestamps: true,
        }5
      );
  
      const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
      return Product;
    }
  }