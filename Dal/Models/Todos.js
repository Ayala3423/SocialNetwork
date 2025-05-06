import { DataTypes } from 'sequelize'; 
import sequelize from '../../DB/Config/db.js';  

const Todos = sequelize.define("Todos", {
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
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

export default Todos;