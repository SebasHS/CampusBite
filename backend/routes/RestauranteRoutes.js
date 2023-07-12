import express from "express";
import restauranteModel from "../models/restauranteModel.js";
import restauranteFacade from "../gestores/restauranteFacade.js";

const RestauranteRouter = express.Router();

const RestauranteFacade = await restauranteFacade.getInstance(restauranteModel);

RestauranteRouter.get(
    '/horarios-restau',
    RestauranteFacade.getHorarios
  );


export default RestauranteRouter;
