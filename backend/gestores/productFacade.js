import productModel from "../models/productModel.js";
import FacadeFactory from "./FacadeFactory.js";

export default class userFacade extends FacadeFactory {
  // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
  instance;
  productModel;

  constructor(productModel) {
    super();
    this.productModel = productModel;
  }

  static async getInstance(userModel) {
    if (this.instance == null) {
      this.instance = new userFacade(userModel);
      return this.instance;
    } else {
      return this.instance;
    }
  }

  getTodos = expressAsyncHandler(async (req, res) => {
   const products = await productModel.iniciar.find(),
  });
   
}