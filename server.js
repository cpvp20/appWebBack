const express = require('express');
let jwt = require('jsonwebtoken');
const cors = require('cors')
const port = process.env.PORT || 3000;
const app = express();
const jsPDF = require("jspdf");

corsOptions = {
    origin: 'https://ambuplataforma.herokuapp.com'
};
app.use(cors(corsOptions));

app.use(express.json());

const usuariosRouter = require('./routes/usuarios');
const especiesRouter = require('./routes/especies');
const bosquesRouter = require('./routes/bosques');
const rescatesRouter = require('./routes/rescates');
const animalesRouter = require('./routes/animales');
const fichasRouter = require('./routes/fichas');
const reportesRouter = require('./routes/reportes');

const bcrypt = require('bcrypt');
const Usuarios = require('./db/usuarios');

app.use('/api/usuarios', authMiddleware, usuariosRouter);
app.use('/api/especies', authMiddleware, especiesRouter);
app.use('/api/bosques', authMiddleware, bosquesRouter); 
app.use('/api/rescates', authMiddleware, rescatesRouter);
app.use('/api/animales', authMiddleware, animalesRouter);
app.use('/api/fichas', authMiddleware, fichasRouter);
app.use('/api/reportes', authMiddleware, reportesRouter);

app.post('/api/login', async function (req, res) {
    Usuarios.findOne({
        correo: req.body.correo
    }, (err, data) => {
        if (err) {
            res.statusCode = 400;
            res.end("Credenciales incorrectas");
        } else {
            //comparar pswds
            if (bcrypt.compareSync(req.body.password, data.password)) {
                let token = jwt.sign({
                    nombre: data.nombre,
                    correo: data.correo
                }, 'secret');
                console.log("Usuario logueado con token");
                console.log(token);
                res.statusCode = 200;
                res.end(token);
            } else {
                res.statusCode = 400;
                res.end("Credenciales incorrectas");
            }
        }
    })
});


async function authMiddleware(req, res, next) {
    // Validar el token 
    token = req.headers['x-user-token'];
    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            res.status(401);
            console.log("Token invalido");
            res.end("Token invalido");
        } else {
            console.log("decoded");
            console.log(decoded.correo);
            console.log(decoded.nombre);
            req.nombre = decoded.nombre;
            req.correo = decoded.correo;
            next();
        }
    });
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
