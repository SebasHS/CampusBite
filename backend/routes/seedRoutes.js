
import express from "express";
import userModel from "../models/userModel.js";
import data from "../data_users.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await userModel.iniciarUserModel().deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});
export default seedRouter;
