const express = require('express');
const router = express.Router();
//const fs = require('fs');
const Animales = require('../db/animales');

//get animales
router.route('/').get((req, res) => {
    //Animales.deleteMany(function (err) {
      //  if (err) console.log(err);
        //console.log("Successful deletion");
    //});
    Animales.find()
        .then(animales => {
            res.statusCode = 200;
            res.send(animales);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//get una animal
router.route('/:id_animal').get((req, res) => {
    Animales.findOne({
            id_animal: req.params.id_animal
        })
        .then(animal => {
            res.statusCode = 200;
            res.send(animal);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

module.exports = router;