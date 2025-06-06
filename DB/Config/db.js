import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ROOT,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
await connection.end();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_ROOT, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
});

sequelize
  .authenticate()
  .then(() => console.log("Successfully connected to newly created MySQL DB"))
  .catch((err) => console.error("Error connecting to MySQL:", err));

export default sequelize;