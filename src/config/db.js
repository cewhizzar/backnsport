const mysql = require("mysql2/promise");
const models = require("../models");

initialize();
async function initialize() {
  const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS `" + process.env.DB_DATABASE + "`"
  );
  await models.sequelize.sync({ alter: true });
}
