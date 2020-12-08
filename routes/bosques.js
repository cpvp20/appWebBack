const express = require('express');
const router = express.Router();
const Bosques = require('../db/bosques');

//get bosques
router.route('/').get((req, res) => {
    Bosques.find()
        .then(bosques => {
            res.statusCode = 200;
            res.send(bosques);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//get un bosque
router.route('/:id_bosque').get((req, res) => {
    Bosques.findOne({
            id_bosque: req.params.id_bosque
        })
        .then(bosque => {
            res.statusCode = 200;
            res.send(bosque);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//crear un bosque
router.route('/').post(async function (req, res) {
    let bosques = await Bosques.find();
    let ultimoId = bosques.length>0 ? Math.max.apply(null, bosques.map(item => item.id_bosque)) : 0;  //si es el primero, el ulId sera 0
    console.log("ultimo ID: ", ultimoId);

    let nuevoBosque = req.body;
    // Validar si existe un bosque con el mismo nombre 
    let mismoNombre = await Bosques.find({
        nombre: nuevoBosque.nombre
    });

    if (mismoNombre.length > 0) {
        res.statusCode = 400;
        res.send('Ya existe un bosque con el mismo nombre');
    } else {
        nuevoBosque.id_bosque = (ultimoId+1);
        let bosqueDocument = Bosques(nuevoBosque);
        bosqueDocument.save()
            .then(bosque => {
                res.statusCode = 200;
                res.send(bosque);
            })
            .catch(reason => {
                res.statusCode = 500;
                res.end();
            });
    }
});

//editar un bosque
router.route('/:id_bosque').put(async function (req, res) {
    // Validar si existe un bosque con el mismo nombre 
    let mismoNombre = await Bosques.findOne({
        nombre: req.body.nombre
    });
    if (mismoNombre && mismoNombre.id_bosque != parseInt(req.params.id_bosque)) {
        res.statusCode = 400;
        res.send('Ya existe un bosque con el mismo nombre');
    } else {
        Bosques.findOne({
                id_bosque: req.params.id_bosque
            })
            .then(bosque => {
                bosque.nombre = req.body.nombre;
                bosque.especies = req.body.especies;
                bosque.flora = req.body.flora;
                bosque.superficie = req.body.superficie;
                bosque.save()
                    .then(bosque => {
                        res.statusCode = 200;
                        res.send(bosque);
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
    }
});

//borrar un bosque
router.route('/:id_bosque').delete((req, res) => {
    Bosques.deleteOne({
            id_bosque: req.params.id_bosque
        })
        .then(() => {
            res.statusCode = 200;
            console.log("Bosque borrado");
            res.end();
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });
});



module.exports = router;