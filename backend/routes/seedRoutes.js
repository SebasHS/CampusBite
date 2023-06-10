
import express from "express";
import userModel from "../models/userModel.js";
import data from "../data_users.js";
import productModel from "../models/productModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await userModel.iniciarUserModel().deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  await productModel.iniciarProductModel().deleteMany({});
  const createdProducts = await Product.insertMany(data.users);
  res.send({ 
    //createdUsers,
     createdProducts });
});
export default seedRouter;
