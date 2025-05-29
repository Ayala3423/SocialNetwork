import { DataTypes } from 'sequelize';
import sequelize from '../../DB/db.js';

export const User = sequelize.define('User', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  Password: { type: DataTypes.STRING, allowNull: false },
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  Phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  Type: { type: DataTypes.STRING, allowNull: false },
});

export default Users;