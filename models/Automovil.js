const mongoose = require('mongoose');

const automovilEsquema = new mongoose.Schema({
    matricula : String,
    marca : String,
    modelo : String,
    color : String,
    precio : Number
})

const AutomovilModel = mongoose.model('Automovil',automovilEsquema,'automoviles');
module.exports = AutomovilModel;