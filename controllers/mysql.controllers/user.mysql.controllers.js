const sequelize = require("../../dataBases/mysql");
const usersModel = require("../../models/mysql/users.mysql.model");

const user = {
  getUsers: async (req, res) => {
    const allUsers = await usersModel.findAll();
    res.json(allUsers);
  },
  insertUser: async (req, res) => {
    const { userName, email, pass } = req.body;
    const existUser = await usersModel.findAll({ where: { email } });
    console.log(existUser);
    if (existUser == []) {
      res.json("existe");
    } else {
      const insert = await usersModel.create({ userName, email, pass });
      res.json(insert);
    }
  },
  deleteUser: async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const deleteUser = await usersModel.destroy({ where: { email } });
    res.json(deleteUser);
  },
};

module.exports = user;
