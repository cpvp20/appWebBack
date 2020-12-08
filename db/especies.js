const mongoose = require('./mongodb-connect')

let especiesSchema = mongoose.Schema({
    id_especie: {
        type: Number,
        required: true
    },
    nombre_cientifico: {
        type: String
    },
    nombre_comun: {
        type: String,
        required: true
    },
    clase: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    origen: {
        type: String,
        required: true
    },
    norma: {
        type: String,
        required: true
    },
    apendice_CITES: {
        type: String,
        required: true
    },
    estados: {
        type: Array 
    }
});

let Especies = mongoose.model('especies', especiesSchema);

module.exports = Especies;

