const Sequelize = require("sequelize");

const connection = new Sequelize(
  "blog_project",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "-03:00",
  }
);

module.exports = connection;
