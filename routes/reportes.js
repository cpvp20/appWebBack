const express = require('express');
const router = express.Router();
const Animales = require('../db/animales');
const Bosques = require('../db/bosques');
const Especies = require('../db/especies');
const Usuarios = require('../db/usuarios');
const Rescates = require('../db/rescates');

router.route('/').get(async function (req, res) {

    //¿Cuántos rescates ha hecho cada usuario?
    let arrUsuarios = [];
    let temp;
    let usuarios = await Usuarios.find();
    for (let i = 0; i < usuarios.length; i++) {
        await Rescates.countDocuments({
            'encargado': usuarios[i].correo,
        }, function (err, count) {
            if (err) return handleError(err);
            temp = {
                'usuario': usuarios[i].nombre + ' ' + usuarios[i].apellidos,
                'rescates': count
            };
            arrUsuarios.push(temp);
        });
    }
  
    //Total de especies en la plataforma 
    totalEspecies = await Especies.countDocuments();
 
    //Total de especies en la plataforma por clase
    let arrClases = [];
    await Especies.countDocuments({
        'clase': 'Mamifero',
    }, function (err, count) {
        if (err) return handleError(err);
        temp = {
            'clase': 'Mamifero',
            'especies': count
        };
        arrClases.push(temp);
    });

    await Especies.countDocuments({
        'clase': 'Ave',
    }, function (err, count) {
        if (err) return handleError(err);
        temp = {
            'clase': 'Ave',
            'especies': count
        };
        arrClases.push(temp);
    });

    await Especies.countDocuments({
        'clase': 'Reptil',
    }, function (err, count) {
        if (err) return handleError(err);
        temp = {
            'clase': 'Reptil',
            'especies': count
        };
        arrClases.push(temp);
    });

   //Total de Animales en la plataforma 
   totalAnimales = await Animales.countDocuments();

    //Total de rescates capturas 
    totalRescatesCaptura = await Rescates.countDocuments({'tipo': 'Captura'});

    let responseArr = {
        'rescatesPorUsuario': arrUsuarios,
        'totalEspecies': totalEspecies,
        'especiesPorClase': arrClases,
        'totalAnimales': totalAnimales,
        'totalRescatesCaptura': totalRescatesCaptura
    };

    res.statusCode = 200;
    res.send(responseArr);

});

module.exports = router;