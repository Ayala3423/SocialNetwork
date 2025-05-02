const { DataTypes } = require("sequelize");
const sequelize = require(".../Config/db.js");

const Comments = sequelize.define("Comments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Posts",
      key: "id"
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  name: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Comments;