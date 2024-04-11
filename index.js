const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//importar rutas
const automovilesRutas = require ('./routes/automovilRutas');
//configuraciones 
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;
 // configurar express para json 
 app.use(express.json());
//conexion con db
mongoose.connect(MONGODB_URI)
    .then(() => {
                console.log('conexion con MONGODB exitosa');
                app.listen(PORT, () => { console.log(`Servidor en funcionando en puerto: ${PORT}`) });
            })
    .catch( error => console.log("Error de conexion con MongoDB", error));
app.use('/ruta-automovil', automovilesRutas)

