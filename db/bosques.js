const mongoose = require('./mongodb-connect')

let bosquesSchema = mongoose.Schema({
    id_bosque: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    superficie: {
        type: String
    },
    flora: {
        type: String
    },
    especies: {
        type: Array 
    }
});

let Bosques = mongoose.model('bosques', bosquesSchema);

module.exports = Bosques;

