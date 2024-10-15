const { Sequelize } = require("sequelize");
const config = require("../config/database");

const sequelize = new Sequelize(config.postgres.dbname, config.postgres.dbuser, config.postgres.dbpass, {
  host: config.postgres.dbhost,
  port: config.postgres.dbport,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: false,
});

module.exports = sequelize;