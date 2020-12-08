const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Rescates = require('../db/rescates');
const Animales = require('../db/animales');
const {
    use
} = require('./usuarios');

//get rescates
router.route('/').get((req, res) => {
    //Rescates.deleteMany(function (err) {
    //  if (err) console.log(err);
    //console.log("Successful deletion");
    //});
    Rescates.find()
        .then(rescates => {
            res.statusCode = 200;
            res.send(rescates);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});


//get un rescate
router.route('/:id_rescate').get((req, res) => {
    Rescates.findOne({
            id_rescate: req.params.id_rescate
        })
        .then(rescate => {
            res.statusCode = 200;
            res.send(rescate);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

var path = require('path');

router.route('/pdf/:id_rescate').get((req, res) => {

    // const {
    //     jsPDF
    // } = require("jspdf"); // will automatically load the node version

    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("hello.pdf"); // will save the file in the current working directory
    // res.statusCode = 200;
    //res.sendFile('/hello.pdf');
   // res.sendFile(path.join(__dirname, '/../hello.pdf'));

    //es.download("./hello.pdf");

    //const file = `${__dirname}/../hello.pdf`;
    //res.sendFile(file); // Set disposition and send it.

});

//crear una rescate
router.route('/').post(async function (req, res) {
    let rescates = await Rescates.find();
    console.log(rescates);
    let ultimoIdRescate = rescates.length > 0 ? Math.max.apply(null, rescates.map(item => item.id_rescate)) : 0; //si es el primero, el ulId sera 0
    console.log("ultimo ID rescate: ", ultimoIdRescate);

    let nuevoRescate = {
        "encargado": req.body.encargado,
        "telefono_entregador": req.body.telefono_entregador,
        "nombre_entregador": req.body.nombre_entregador,
        "fecha_entrega": req.body.fecha_entrega + 'T' + req.body.hora_entrega,
        "fecha_ingreso": req.body.fecha_ingreso + 'T' + req.body.hora_ingreso,
        "entrega_ingreso": req.body.entrega_ingreso,
        "direccion_origen": req.body.direccion_origen,
        "direccion_entrega": req.body.direccion_entrega,
        "municipio_origen": req.body.municipio_origen,
        "municipio_entrega": req.body.municipio_entrega,
        "coordenadas_origen": req.body.coordenadas_origen,
        "coordenadas_entrega": req.body.coordenadas_entrega,
        "orgs_participantes": req.body.orgs_participantes,
        "resena": req.body.resena,
        "tipo": req.body.tipo,
        "situacion": req.body.situacion,
        "CMC_fue": req.body.CMC_fue,
        "total_animales": req.body.total_animales,
        "recibe": req.body.recibe,
    }
    nuevoRescate.id_rescate = (ultimoIdRescate + 1);

    let animales = await Animales.find();
    let ultimoIdAnimal = animales.length > 0 ? Math.max.apply(null, animales.map(item => item.id_animal)) : 0; //si es el primero, el ulId sera 0
    console.log("ultimo ID animal: ", ultimoIdAnimal);
    let animalesArr = req.body.animales;
    animalesArr.forEach(animal => {
        ultimoIdAnimal += 1;
        animal.id_animal = ultimoIdAnimal;
    });

    //guardar en el arreglo del rescate
    nuevoRescate.animales = Array.from(animalesArr);

    //guarda cada animal como tal
    animalesArr.forEach(animal => {
        animal.id_rescate = nuevoRescate.id_rescate;
        let animalDocument = Animales(animal);
        animalDocument.save()
            .then(animal => {
                console.log("Animal guardado");
                //console.log(animal);
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.send("Error al guardar animales");
                res.end();
                return;
            });
    });

    //console.log(nuevoRescate);
    let rescateDocument = Rescates(nuevoRescate);
    rescateDocument.save()
        .then(rescate => {
            res.statusCode = 200;
            res.send(rescate);
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.send("Error al guardar reporte de rescate");
        });
});

//editar un rescate
router.route('/:id_rescate').put(async function (req, res) {

    Rescates.findOne({
            id_rescate: req.params.id_rescate
        })
        .then(rescate => {
            rescate.telefono_entregador = req.body.telefono_entregador;
            rescate.nombre_entregador = req.body.nombre_entregador;
            rescate.fecha_entrega = req.body.fecha_entrega + 'T' + req.body.hora_entrega;
            rescate.fecha_ingreso = req.body.fecha_ingreso + 'T' + req.body.hora_ingreso;
            rescate.entrega_ingreso = req.body.entrega_ingreso;
            rescate.direccion_origen = req.body.direccion_origen;
            rescate.direccion_entrega = req.body.direccion_entrega;
            rescate.municipio_origen = req.body.municipio_origen;
            rescate.municipio_entrega = req.body.municipio_entrega;
            rescate.coordenadas_origen = req.body.coordenadas_origen;
            rescate.coordenadas_entrega = req.body.coordenadas_entrega;
            rescate.orgs_participantes = req.body.orgs_participantes;
            rescate.resena = req.body.resena;
            rescate.tipo = req.body.tipo;
            rescate.situacion = req.body.situacion;
            rescate.CMC_fue = req.body.CMC_fue;
            rescate.recibe = req.body.recibe;

            let animalesArr = req.body.animales;
            console.log("animalesArr");
            console.log(animalesArr);

            //actualizar arreglo de animales en el rescate
            for (let i = 0; i < rescate.animales.length; i++) {
                console.log("En el arreglo del rescate, actualizando al animal con el id ", rescate.animales[i].id_animal);
                console.log(rescate.animales[i]);
                rescate.animales[i].especie = animalesArr[i].especie;
                rescate.animales[i].vivo = animalesArr[i].vivo;
                rescate.animales[i].sano = animalesArr[i].sano;
                rescate.animales[i].observaciones = animalesArr[i].observaciones;
                console.log("Animal guardado");
                console.log(rescate.animales[i]);
            }

            //actualizar tambien los animales individuales
            for (let i = 0; i < rescate.animales.length; i++) {
                console.log("En el animal como tal, actualizando al animal con el id ", rescate.animales[i].id_animal);
                Animales.findOne({
                    id_animal: rescate.animales[i].id_animal
                }).then(animal => {
                    animal.especie = rescate.animales[i].especie;
                    animal.vivo = rescate.animales[i].vivo;
                    animal.sano = rescate.animales[i].sano;
                    animal.observaciones = rescate.animales[i].observaciones;
                    animal.save()
                        .then(animal => {
                            console.log("Animal guardado");
                            //console.log(animal);
                        })
                        .catch(reason => {
                            res.statusCode = 500;
                            console.log(reason);
                            res.send("Error al guardar animales");
                            res.end();
                            return;
                        });
                }).catch(reason => {
                    res.statusCode = 500;
                    res.send("Error al tratar de encontrar animal para editarlo");
                    console.log(reason);
                    res.end();
                    return;
                });
            }
            //finalmente guardar reporte
            rescate.markModified('animales'); //IMPORTANTE!!!!!!!!! Sin esto, el cambio en el arreglo de animales en rescate no se guarda
            rescate.save()
                .then(rescate => {
                    res.statusCode = 200;
                    //console.log("despues de guardar")
                    //console.log(rescate);
                    res.end();
                })
                .catch(reason => {
                    res.statusCode = 500;
                    res.send("Error al tratar de guardar rescate");
                    console.log(reason);
                    res.end();
                    return;
                });
        })
        .catch(reason => {
            res.statusCode = 500;
            res.send("Error al tratar de encontrar rescate para editarlo");
            console.log(reason);
            res.end();
            return;
        });


});
module.exports = router;