const cassandra = require("cassandra-driver");
const config = require("../config/database");

const cloud = { secureConnectBundle: config.cassandra.bundle };
const authProvider = new cassandra.auth.PlainTextAuthProvider("token", config.cassandra.token);
const client = new cassandra.Client({ cloud, authProvider });

module.exports = client;