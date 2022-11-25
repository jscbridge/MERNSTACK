const Sequelize = require("sequelize");

const sequelize = new Sequelize("MERN", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  define: {
    timestamps: false,
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DataBase MySql: ON");
  })
  .catch((err) => {
    console.log("DataBase Mysql: OFF");
  });
module.exports = sequelize;
