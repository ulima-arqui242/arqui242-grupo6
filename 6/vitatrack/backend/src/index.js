const app = require("./app");
const database = require("./factory/databaseFactory");

app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
})