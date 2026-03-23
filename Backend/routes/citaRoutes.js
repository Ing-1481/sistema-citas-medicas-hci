import express from "express";
import {
  crearCita,
  obtenerCitas,
  actualizarCita,
  eliminarCita
} from "../controllers/citaController.js";

const router = express.Router();

router.get("/", obtenerCitas);
router.post("/", crearCita);
router.put("/:id", actualizarCita);
router.delete("/:id", eliminarCita);

export default router;