const { Sequelize, DataTypes } = require('Sequelize');
const sequelize = require('../../dataBases/mysql');


const Users = sequelize.define('USERS', {
    idUser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
}, {
    sequelize,
    modelName: "USERS"
});

module.exports = Users;

