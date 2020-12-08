const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Especies = require('../db/especies');

//get especies
router.route('/').get((req, res) => {
    Especies.find()
        .then(especies => {
            res.statusCode = 200;
            res.send(especies);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//get una especie
router.route('/:id_especie').get((req, res) => {
    Especies.findOne({
            id_especie: req.params.id_especie
        })
        .then(especie => {
            res.statusCode = 200;
            res.send(especie);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//crear una especie
router.route('/').post(async function (req, res) {
    let especies = await Especies.find();
    let ultimoId = especies.length>0 ? Math.max.apply(null, especies.map(item => item.id_especie)) : 0;  //si es el primero, el ulId sera 0
    console.log("ultimo ID: ", ultimoId);
    let nuevaEspecie = req.body;

    // Validar si existe una especie con el mismo nombre comun
    let mismoNombreComun = await Especies.find({
        nombre_comun: nuevaEspecie.nombre_comun
    });
    if (mismoNombreComun.length > 0) {
        res.statusCode = 400;
        res.send('Ya existe una especie con el mismo nombre');
    } else {
        nuevaEspecie.id_especie = (ultimoId + 1);
        let especieDocument = Especies(nuevaEspecie);
        especieDocument.save()
            .then(especie => {
                res.statusCode = 200;
                res.send(especie);
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.end();
            });
    }
});

//editar una especie
router.route('/:id_especie').put(async function (req, res) {
    // Validar si existe una especie con el mismo nombre comun
    let mismoNombreComun = await Especies.findOne({nombre_comun: req.body.nombre_comun});
    if (mismoNombreComun && mismoNombreComun.id_especie != parseInt(req.params.id_especie)) {
        res.statusCode = 400;
        res.send('Ya existe una especie con el mismo nombre');
    } else {
        Especies.findOne({
                id_especie: req.params.id_especie
            })
            .then(especie => {
                especie.apendice_CITES = req.body.apendice_CITES;
                especie.norma = req.body.norma;
                especie.descripcion = req.body.descripcion;
                especie.nombre_comun = req.body.nombre_comun;
                especie.nombre_cientifico = req.body.nombre_cientifico;
                especie.origen = req.body.origen;
                especie.clase = req.body.clase;
                especie.estados = req.body.estados;
                especie.origen = req.body.origen;
                especie.save()
                    .then(especie => {
                        res.statusCode = 200;
                        res.end();
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        console.log("Error al tratar de guardar");
                        console.log(reason);
                        res.end();
                    });
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log("Error al tratar de encontrar especie para editar");
                console.log(reason);
                res.end();
            });
    }
});

//borrar una especie
router.route('/:id_especie').delete((req, res) => {
    Espcies.deleteOne({
            id_especie: req.params.id_especie
        })
        .then(() => {
            res.statusCode = 200;
            console.log("Especie borrada");
            res.end();
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });
});

module.exports = router;