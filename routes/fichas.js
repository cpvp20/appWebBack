const express = require('express');
const router = express.Router();
const Fichas = require('../db/fichas');

//get fichas
router.route('/').get((req, res) => {
    Fichas.find()
        .then(fichas => {
            res.statusCode = 200;
            res.send(fichas);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//get fichas de un animal
router.route('/animal/:id_animal').get((req, res) => {
    Fichas.find({
            'id_animal': req.params.id_animal
        })
        .then(fichas => {
            res.statusCode = 200;
            res.send(fichas);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//get una ficha
router.route('/:id_ficha').get((req, res) => {
    Fichas.findOne({
            id_ficha: req.params.id_ficha
        })
        .then(ficha => {
            res.statusCode = 200;
            res.send(ficha);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//crear una ficha
router.route('/').post(async function (req, res) {
    let fichas = await Fichas.find();
    let ultimoId = fichas.length > 0 ? Math.max.apply(null, fichas.map(item => item.id_ficha)) : 0; //si es el primero, el ulId sera 0
    let nuevaFicha = {
        "id_animal": req.body.id_animal,
        "encargado": req.body.encargado,
        "sexo": req.body.sexo,
        "peso": req.body.peso,
        "edad": req.body.edad,
        "fecha": req.body.fecha + 'T' + req.body.hora,
        "nivel_reaccion": req.body.nivel_reaccion,
        "frecuencia_cardiaca": req.body.frecuencia_cardiaca,
        "frecuencia_respiratoria": req.body.frecuencia_respiratoria,
        "temperatura": req.body.temperatura,
        "condicion_corporal": req.body.condicion_corporal,
        "tiempo_llenado_capilar": req.body.tiempo_llenado_capilar,
        "pulso": req.body.pulso,
        "hidratacion": req.body.hidratacion,
        "examen_fisico": req.body.examen_fisico,
        "observaciones": req.body.observaciones,
        "diagnostico": req.body.diagnostico,
    };
    nuevaFicha.id_ficha = (ultimoId + 1);
    let fichaDocument = Fichas(nuevaFicha);
    fichaDocument.save()
        .then(bosque => {
            res.statusCode = 200;
            res.send(bosque);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//editar una ficha
router.route('/:id_ficha').put(async function (req, res) {

    Fichas.findOne({
            id_ficha: req.params.id_ficha
        })
        .then(ficha => {
            //id_animal y encargado no cambian
            ficha.sexo = req.body.sexo;
            ficha.peso = req.body.peso;
            ficha.edad = req.body.edad;
            ficha.fecha = req.body.fecha + 'T' + req.body.hora;
            ficha.nivel_reaccion = req.body.nivel_reaccion;
            ficha.frecuencia_cardiaca = req.body.frecuencia_cardiaca;
            ficha.frecuencia_respiratoria = req.body.frecuencia_respiratoria;
            ficha.temperatura = req.body.temperatura;
            ficha.condicion_corporal = req.body.condicion_corporal;
            ficha.tiempo_llenado_capilar = req.body.tiempo_llenado_capilar;
            ficha.pulso = req.body.pulso;
            ficha.hidratacion = req.body.hidratacion;
            ficha.examen_fisico = req.body.examen_fisico;
            ficha.observaciones = req.body.observaciones;
            ficha.diagnostico = req.body.diagnostico;

            ficha.save()
                .then(ficha => {
                    res.statusCode = 200;
                    res.send(ficha);
                })
                .catch(reason => {
                    res.statusCode = 500;
                    console.log(reason);
                    res.end();
                });
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });

});

//borrar una ficha
router.route('/:id_ficha').delete((req, res) => {
    Fichas.deleteOne({
            id_ficha: req.params.id_ficha
        })
        .then(() => {
            res.statusCode = 200;
            console.log("Ficha borrada");
            res.end();
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });
});



module.exports = router;