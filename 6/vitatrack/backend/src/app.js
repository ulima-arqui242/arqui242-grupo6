const express = require('express');
const cors = require('cors');
const prueba = require('./routes/prueba');

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}))
app.use("/api", prueba);

module.exports = app;