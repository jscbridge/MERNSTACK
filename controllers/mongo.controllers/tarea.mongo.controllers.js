const tareaModel = require("../../models/mongo/tareas.mongo.model");

const Tareas = {
  getTareas: async (req, res) => {
    const infoTareas = await tareaModel.find({ idUsuario: req.body.idUsuario });
    res.json(infoTareas);
  },
  insertTareas: async (req, res) => {
    console.log(req.body);
    const { idUsuario, nombreTarea } = req.body;
    let info = { idUsuario, nombreTarea };
    const insertTareas = await tareaModel.create(info);
    res.json(insertTareas);
  },
  deleteTareas: async (req, res) => {
    const { nombreTarea } = req.body;
    const deleteTarea = await tareaModel.deleteOne({ nombreTarea });
    res.json(deleteTarea);
  },
  updateTareas: async (req, res) => {
    const { id, nombreTarea } = req.body;
    let filter = { _id: id };
    let update = { nombreTarea };
    const updateTarea = await tareaModel.findByIdAndUpdate(filter, update);
    res.json(updateTarea);
  },
};

module.exports = Tareas;
