import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('conectado a la base de datos')
    })
    .catch((err) => {
    console.log(err.message)
})

const app = express();

app.get('/api')

app.use("/api/seed", seedRouter);

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server en puerto ${port}`);
})