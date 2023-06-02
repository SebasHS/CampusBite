import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

async function main() {
  dotenv.config();
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("conectado a la base de datos");
    })
    .catch((err) => {
      console.log(err.message);
    });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server en puerto ${port}`);
  });
}

main();
