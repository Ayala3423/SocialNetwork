const { DataTypes } = require("sequelize");
const sequelize = require(".../Config/db.js");

const Passwords = await sequelize.define("Passwords", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  Password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Passwords;