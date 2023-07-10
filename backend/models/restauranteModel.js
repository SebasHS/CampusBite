import mongoose from "mongoose";
//Clase Restaurante que genera el modelo para MongoDB

export default class restauranteModel {
  constructor() {}
  static iniciarRestauranteModel() {
    const restauranteSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );

    const User = mongoose.models.User || mongoose.model("User", userSchema);
    return User;
  }
}
