const mongoose = require('./mongodb-connect')

let usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    IMSS: {
        type: String
    },
    alergias: {
        type: String
    },    
    tipo_sangre: {
        type: String
    },
    fecha_registro: {
        type: Date,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

usuarioSchema.statics.agregarUsuario = function(usuario) {
    console.log(usuario);
    let nuevoUsuario = Usuario(usuario);
    return nuevoUsuario.save();
}

let Usuario = mongoose.model('usuarios', usuarioSchema);

module.exports = Usuario;

