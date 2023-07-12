import mongoose from "mongoose";
import userModel from "./userModel.js";
//Clase Restaurante que genera el modelo para MongoDB

export default class restauranteModel {
  constructor() {}
  static iniciarRestauranteModel() {
    const User = userModel.iniciarUserModel();

    if (mongoose.modelNames().includes('Restaurante')) {
      mongoose.deleteModel('Restaurante');
    }
    if (User.discriminators && 'Restaurante' in User.discriminators) {
      delete User.discriminators.Restaurante;
    }
    
    const restauranteUsuario =  User.discriminator('Restaurante',new mongoose.Schema(
      {
        isAdmin: { type: Boolean, default: true, required: true },
        horario: { type: Map, of: String},
      },
      {
        timestamps: true,
        discriminatorKey: 'kind' 
      }
    ))  ;

    const Restaurante = mongoose.models.Restaurante || mongoose.model("Restaurante", restauranteUsuario);
    return Restaurante;
  }
}
