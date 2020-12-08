const mongoose = require('./mongodb-connect')

let animalesSchema = mongoose.Schema({
    id_animal: {
        type: Number,
        required: true
    },
    id_rescate: {
        type: Number,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    observaciones: {
        type: String
    },
    sano: {
        type: Boolean,
        required: true
    },
    vivo: {
        type: Boolean,
        required: true
    }
});

let Animales = mongoose.model('animales', animalesSchema);

module.exports = Animales;

