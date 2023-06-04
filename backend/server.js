import mongoose from "mongoose";
import dotenv from "dotenv";
import App from "./app.js";

class Main {
  constructor() {
    dotenv.config();
  }

  async conexionBD() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Conectado a la base de datos");
    } catch (err) {
      console.log(err.message);
    }
  }

  start() {
    const port = process.env.PORT || 4000;
    const app = new App();
    app.start(port);
  }

  async run() {
    await this.conexionBD();
    this.start();
  }
}
const main = new Main();
main.run();
