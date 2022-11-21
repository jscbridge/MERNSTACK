const tareaModel = require("../../models/mongo/tareas.mongo.model");

const Tareas = {
  getTareas: async (req, res) => {
    const infoTareas = await tareaModel.find({ idUsuario: req.body.idUsuario });
    res.json(infoTareas);
  },
  insertTarea: async (req, res) => {
    console.log(req.body);
    const { idUsuario, nombreTarea } = req.body;
    let info = { idUsuario, nombreTarea };
    const insertTareas = await tareaModel.create(info);
    res.json(insertTareas);
  },
  deleteTarea: async (req, res) => {
    const { nombreTarea } = req.body;
    const deleteTarea = await tareaModel.deleteOne({ nombreTarea });
    res.json(deleteTarea);
  },
  deleteAllTareas: async (req, res) => {
    const { idUsuario } = req.body;
    console.log(idUsuario);
    const deleteAllTareas = await tareaModel.delete({
      where: { idUsuario },
    });
    res.json(deleteAllTareas);
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
