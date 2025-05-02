const { DataTypes } = require("sequelize");
const sequelize = require(".../Config/db.js");

const Photos = sequelize.define("Photos", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  albumId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Albums",
      key: "id"
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  title: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  thumbnailUrl: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Photos;