import express from "express";
import userModel from "../models/userModel.js";
import data from "../data.js";
import productModel from "../models/productModel.js";
import restauranteModel from "../models/restauranteModel.js";
import data_restaurantes from "../data_restaurantes.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  // await userModel.iniciarUserModel().deleteMany({});
  //const createdUsers = await User.insertMany(data.users);
  const Product = productModel.iniciarProductModel();
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  //const Restaurante = restauranteModel.iniciarRestauranteModel();
  //await Restaurante.deleteMany({});
  //const createdRestaurantes = await Restaurante.insertMany(data_restaurantes.restaurantes);
  res.send({
    //createdUsers,
    //createdRestaurantes,
    createdProducts,
  });
});
export default seedRouter;
