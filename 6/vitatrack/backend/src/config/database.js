const { Sequelize } = require("sequelize");
require("dotenv").config();

dbname = process.env["DB_NAME"];
dbuser = process.env["DB_USER"];
dbpass = process.env["DB_PASSWORD"];
dbhost = process.env["DB_HOST"];
dbport = process.env["DB_PORT"];

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  port: dbport,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("Conectado"))
  .catch(err => console.error("Error", err));

module.exports = sequelize;