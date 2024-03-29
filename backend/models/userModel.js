import mongoose from "mongoose";
//Clase Producto que genera el modelo para MongoDB

export default class userModel {
  constructor() {}
  static iniciarUserModel() {
    const userSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
      },
      {
        timestamps: true,
        discriminatorKey: 'kind'
      }
    );

    const User = mongoose.models.User || mongoose.model("User", userSchema);
    return User;
  }
}
