console.log("APP DE CITAS NUEVA ACTIVA");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import citaRoutes from "./routes/citaRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/citas", citaRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado ✅");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => console.log(error));