const { DataTypes } = require("sequelize");
const sequelize = require(".../Config/db.js");

const Users = sequelize.define("Users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  address: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  company: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Users;
