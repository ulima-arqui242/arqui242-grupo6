const express = require("express");
const database = require("./factory/databaseFactory");

const app = express();
const cassandraDb =  database.createDatabase("cassandra");

app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
  cassandraDb.connect().then(() => console.log("Cassandra conecta")).catch((err) => console.log(err));
})