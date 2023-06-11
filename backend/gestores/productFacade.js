import productModel from "../models/productModel.js";
import FacadeFactory from "./FacadeFactory.js";
import expressAsyncHandler from "express-async-handler";

export default class userFacade extends FacadeFactory {
  // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
  instance;
  productModel;

  constructor(productModel) {
    super();
    this.productModel = productModel;
  }

  static async getInstance(productModel) {
    if (this.instance == null) {
      this.instance = new userFacade(productModel);
      return this.instance;
    } else {
      return this.instance;
    }
  }

  getTodos = expressAsyncHandler(async (req, res) => {
    const products = await productModel.iniciar.find();
  });
}
