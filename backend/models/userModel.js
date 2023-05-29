import mongoose, { Model } from "mongoose";

/*const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
*/
export default class userModel extends Model {
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
      }
    );

    const User = mongoose.model("User", userSchema);
    return User;
  }
}
