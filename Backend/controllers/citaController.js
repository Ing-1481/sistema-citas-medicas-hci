import Cita from "../models/citaModel.js";

export const crearCita = async (req, res) => {
  try {
    console.log("ENTRO A CREAR CITA");
    console.log("BODY RECIBIDO EN POST:", req.body);

    const { paciente, doctor, especialidad, fecha, estado } = req.body;

    const nuevaCita = new Cita({
      paciente,
      doctor,
      especialidad,
      fecha,
      hora: "12:34",
      estado
    });

    const citaGuardada = await nuevaCita.save();

    res.status(201).json({
      mensaje: "Cita registrada correctamente",
      cita: citaGuardada
    });
  } catch (error) {
    console.error("Error al crear cita:", error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find().sort({ fecha: 1 });
    res.json(citas);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    res.status(500).json({ error: error.message });
  }
};

export const actualizarCita = async (req, res) => {
  try {
    console.log("ENTRO A ACTUALIZAR CITA");
    console.log("BODY RECIBIDO EN PUT:", req.body);

    const { paciente, doctor, especialidad, fecha, estado } = req.body;

    const citaActualizada = await Cita.findByIdAndUpdate(
      req.params.id,
      {
        paciente,
        doctor,
        especialidad,
        fecha,
        hora: "12:34",
        estado
      },
      { new: true }
    );

    res.json({
      mensaje: "Cita actualizada correctamente",
      cita: citaActualizada
    });
  } catch (error) {
    console.error("Error al actualizar cita:", error);
    res.status(500).json({ error: error.message });
  }
};

export const eliminarCita = async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Cita eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    res.status(500).json({ error: error.message });
  }
};