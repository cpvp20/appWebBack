const mongoose = require('./mongodb-connect')

let rescatesSchema = mongoose.Schema({
    id_rescate: {
        type: Number,
        required: true
    },
    total_animales: {
        type: Number,
        required: true
    },
    animales: {
        type: Array,
        required: true
    },
    encargado: {
        type: String,
        required: true
    },
    recibe: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    situacion: {
        type: String,
        required: true
    },
    CMC_fue: {
        type: Boolean,
        required: true
    },
    fecha_entrega: {
        type: Date,
        required: true
    },
    fecha_ingreso: {
        type: Date,
        required: true
    },
    nombre_entregador: {
        type: String
    },
    telefono_entregador: {
        type: String
    },
    resena: {
        type: String
    },
    municipio_entrega: {
        type: String
    },
    direccion_entrega: {
        type: String
    },
    coordenadas_entrega: {
        type: String
    },
    minucipio_origen: {
        type: String
    },
    direccion_origen: {
        type: String
    },
    coordenadas_origen: {
        type: String
    },
    orgs_participantes: {
        type: String,
        required: true
    }
});

let Rescates = mongoose.model('rescates', rescatesSchema);

module.exports = Rescates;

