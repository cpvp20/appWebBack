const mongoose = require('./mongodb-connect')

let fichasSchema = mongoose.Schema({
    id_ficha: {
        type: Number,
        required: true
    },
    id_animal: {
        type: Number,
        required: true
    },
    encargado: {
        type: String,
        required: true
    },
    sexo: {
        type: String
    },
    peso: {
        type: String
    },
    edad: {
        type: String
    },
    fecha: {
        type: Date,
        required: true
    },
    nivel_reaccion: {
        type: Number
    },
    frecuencia_cardiaca: {
        type: Number
    },
    frecuencia_respiratoria: {
        type: Number
    },
    temperatura: {
        type: String
    },
    condicion_corporal: {
        type: Number
    },
    tiempo_llenado_capilar: {
        type: Number
    },
    pulso: {
        type: Number
    },
    hidratacion: {
        type: Number
    },
    examen_fisico: {
        type: String
    },
    observaciones: {
        type: String
    },
    diagnostico: {
        type: String
    },
});

let Fichas = mongoose.model('fichas', fichasSchema);

module.exports = Fichas;