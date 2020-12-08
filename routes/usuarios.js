const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuarios = require('../db/usuarios');

//get usuarios
router.route('/').get((req, res) => {
    Usuarios.find()
        .then(usuarios => {
            res.statusCode = 200;
            res.send(usuarios);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

router.route('/loggedIn').get((req, res) => {
    res.send({'correo': req.correo , 'nombre': req.nombre});
});

//get un usuario
router.route('/:correo').get((req, res) => {
    Usuarios.findOne({
            correo: req.params.correo
        })
        .then(usuario => {
            res.statusCode = 200;
            res.send(usuario);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//crear usuario
router.route('/').post(async function (req, res) {
    let nuevoUsuario = req.body;

    // Validar si existe un usuario con el mismo correo o nombres y apellidos
    let sameEmailUser = await Usuarios.find({
        correo: nuevoUsuario.correo
    });
    let mismoNombreYApellido = await Usuarios.find({
        nombre: nuevoUsuario.nombre,
        apellidos: nuevoUsuario.apellidos
    });

    if (sameEmailUser.length > 0) {
        res.statusCode = 400;
        res.send('Ya existe un usuario con el mismo correo');
    } else if (mismoNombreYApellido.length > 0) {
        res.statusCode = 400;
        res.send('Ya existe un usuario con el mismo nombre y apellido');
    } else {
        //guardar hash en la base de datos como password
        nuevoUsuario.password = bcrypt.hashSync(nuevoUsuario.password, 10);
        console.log(nuevoUsuario.password);
        nuevoUsuario.fecha_registro = new Date(); //fecha hoy
        console.log(nuevoUsuario.fecha_registro);
        let usuarioDocument = Usuarios(nuevoUsuario);
        usuarioDocument.save()
            .then(usuario => {
                res.statusCode = 200;
                res.send(usuario);
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.end();
            });
    }
});

//editar un usuario
router.route('/:correo').put(async function (req, res) {
    let mismoNombreYApellido = await Usuarios.findOne({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos
    });
    if (mismoNombreYApellido && mismoNombreYApellido.correo != req.params.correo) {
        res.statusCode = 400;
        res.send('Ya existe un usuario con el mismo nombre y apellido');
    } else {
        Usuarios.findOne({
                correo: req.params.correo
            })
            .then(usuario => {
                if (mismoNombreYApellido > 0 && !ids.includes(usuario.id)) {
                    res.statusCode = 400;
                    res.send('Ya existe un usuario con el mismo nombre y apellido');
                } else {
                    usuario.nombre = req.body.nombre;
                    usuario.apellidos = req.body.apellidos;
                    //correo, pswd y fecha registro no se puede editar!
                    usuario.fecha_nacimiento = req.body.fecha_nacimiento;
                    usuario.IMSS = req.body.IMSS;
                    usuario.telefono = req.body.telefono;
                    usuario.alergias = req.body.alergias;
                    usuario.tipo_sangre = req.body.tipo_sangre;
                    usuario.save()
                        .then(usuario => {
                            res.statusCode = 200;
                            res.end();
                        })
                        .catch(reason => {
                            res.statusCode = 500;
                            console.log("error al tratar de guardar");
                            console.log(reason);
                            res.end();
                        });
                }
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log("error al tratar de encontrar usuario para editarlo");
                console.log(reason);
                res.end();
            });
    }
});


//borrar un usuario
router.route('/:correo').delete((req, res) => {
    Usuarios.deleteOne({
            correo: req.params.correo
        })
        .then(() => {
            res.statusCode = 200;
            console.log("Usuario borrado");
            res.end();
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });
});

module.exports = router;