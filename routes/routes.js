const router = require("express").Router();
const user = require("../controllers/mysql.controllers/user.mysql.controllers");
const tarea = require("../controllers/mongo.controllers/tarea.mongo.controllers");

// USERS Sequelize
router.get("/getusers", user.getUsers);
router.post("/insertuser", user.insertUser);
router.delete("/deleteuser", user.deleteUser);

// TAREA Mongoose
router.post("/getareas", tarea.getTareas);
router.delete("/deletetareas", tarea.deleteTareas);
router.post("/inserttareas", tarea.insertTareas);
router.put("/updatetareas", tarea.updateTareas);





module.exports = router;
