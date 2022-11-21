const mongoose = require("mongoose");

const tareaModeloPlantilla = {
  idUsuario: String,
  nombreTarea: String,
};

const tareaSchema = mongoose.Schema(tareaModeloPlantilla, {
  versionKey: false,
});


const Tareas = mongoose.model("tareas", tareaSchema);

module.exports = Tareas;

