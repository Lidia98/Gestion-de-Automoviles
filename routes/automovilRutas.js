const express = require('express');
const rutas = express.Router();
const AutomovilModel = require('../models/Automovil');

rutas.get('/', async (req, res) =>{
    try {
        const automoviles = await AutomovilModel.find();
        // console.log(automoviles);
        res.json(automoviles);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevoAutomovil = new AutomovilModel({
       matricula: req.body.matricula,
       marca:req. body.marca,
       modelo:req. body.modelo,
       color:req. body.color,
       precio:req. body.precio

    });
    try {
        const guardarAutomovil = await nuevoAutomovil.save();
        res.status(201).json(guardarAutomovil);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
// metodo put
rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarAutomovil = await AutomovilModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarAutomovil);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

//metodo delete
rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarAutomovil = await AutomovilModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Automovil eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//CONSULTAS
// - Listar todas los automoviles por color
rutas.get('/automovil-color/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const automovilesColor = await AutomovilModel.find({ color: req.params.id});
        res.json(automovilesColor);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// - Ordenar los automoviles por precio de forma descendente
rutas.get('/ordenar-automoviles', async (req, res) =>{
    try {
        const automovilesDESC = await AutomovilModel.find().sort({precio: -1});
        res.json(automovilesDESC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Consultar una tarea especifica por Id
rutas.get('/automovil/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const automovil = await AutomovilModel.findById(req.params.id);
        res.json(automovil);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});


module.exports = rutas;