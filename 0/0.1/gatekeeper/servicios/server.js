const express = require('express');
const app = express();

app.get('/services/hello', (req, res) => {
    res.send('Hola Mundo');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
