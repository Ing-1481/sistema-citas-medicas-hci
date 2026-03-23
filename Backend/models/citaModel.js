import mongoose from "mongoose";

const citaSchema = new mongoose.Schema(
  {
    paciente: {
      type: String,
      required: true,
      trim: true
    },
    doctor: {
      type: String,
      required: true,
      trim: true
    },
    especialidad: {
      type: String,
      required: true,
      trim: true
    },
    fecha: {
      type: Date,
      required: true
    },
    hora: {
      type: String,
      required: true,
      trim: true
    },
    estado: {
      type: String,
      default: "pendiente",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Cita = mongoose.model("Cita", citaSchema);

export default Cita;