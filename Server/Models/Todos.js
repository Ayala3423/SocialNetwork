const { DataTypes } = require("sequelize");
const sequelize = require(".../Config/db.js");

const Todos = await sequelize.define("Todos", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
  title: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, allowNull: true },
  is_deleted: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  },
  deleted_at: {
    type: sequelize.DATE,
    allowNull: true
  }
});

module.exports = Todos;