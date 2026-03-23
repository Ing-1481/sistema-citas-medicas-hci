console.log("SCRIPT DE CITAS CARGADO");
alert("SCRIPT NUEVO FUNCIONANDO");
const apiUrl = "http://localhost:5000/api/citas";

const citaForm = document.getElementById("citaForm");
const citaId = document.getElementById("citaId");
const paciente = document.getElementById("paciente");
const doctor = document.getElementById("doctor");
const especialidad = document.getElementById("especialidad");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");
const estado = document.getElementById("estado");
const listaCitas = document.getElementById("listaCitas");

async function obtenerCitas() {
  try {
    const response = await fetch(apiUrl);
    const citas = await response.json();

    listaCitas.innerHTML = "";

    citas.forEach((cita) => {
      const div = document.createElement("div");
      div.classList.add("cita");

      div.innerHTML = `
        <p><strong>Paciente:</strong> ${cita.paciente}</p>
        <p><strong>Doctor:</strong> ${cita.doctor}</p>
        <p><strong>Especialidad:</strong> ${cita.especialidad}</p>
        <p><strong>Fecha:</strong> ${new Date(cita.fecha).toLocaleDateString()}</p>
        <p><strong>Hora:</strong> ${cita.hora || "No registrada"}</p>
        <p><strong>Estado:</strong> ${cita.estado}</p>
        <button class="btn-editar">Editar</button>
        <button class="btn-eliminar">Eliminar</button>
      `;

      div.querySelector(".btn-editar").addEventListener("click", () => {
        editarCita(cita);
      });

      div.querySelector(".btn-eliminar").addEventListener("click", () => {
        eliminarCita(cita._id);
      });

      listaCitas.appendChild(div);
    });
  } catch (error) {
    console.error("Error al obtener citas:", error);
  }
}

citaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("FORMULARIO ENVIADO");

  const nuevaCita = {
    paciente: paciente.value,
    doctor: doctor.value,
    especialidad: especialidad.value,
    fecha: fecha.value,
    hora: hora.value,
    estado: estado.value
  };

  console.log("DATOS A ENVIAR:", nuevaCita);

  try {
    let response;

    if (citaId.value) {
      response = await fetch(`${apiUrl}/${citaId.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaCita)
      });
    } else {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaCita)
      });
    }

    const data = await response.json();
    console.log("RESPUESTA DEL SERVIDOR:", data);

    if (!response.ok) {
      alert(data.mensaje || data.error || "No se pudo guardar la cita");
      return;
    }

    alert(data.mensaje || "Cita guardada correctamente");

    citaForm.reset();
    citaId.value = "";
    obtenerCitas();
  } catch (error) {
    console.error("Error al guardar cita:", error);
    alert("Error al conectar con el servidor");
  }
});

function editarCita(cita) {
  citaId.value = cita._id;
  paciente.value = cita.paciente;
  doctor.value = cita.doctor;
  especialidad.value = cita.especialidad;
  fecha.value = cita.fecha ? cita.fecha.split("T")[0] : "";
  hora.value = cita.hora || "";
  estado.value = cita.estado;
}

async function eliminarCita(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();
    alert(data.mensaje || "Cita eliminada correctamente");

    obtenerCitas();
  } catch (error) {
    console.error("Error al eliminar cita:", error);
  }
}

obtenerCitas();