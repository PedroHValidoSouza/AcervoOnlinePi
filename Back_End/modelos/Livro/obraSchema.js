const {EdicaoSchema} = require("./edicaoSchema")

const mongoose = require("mongoose");
const { Schema } = mongoose;

const autorSchema = new Schema({
    nome:{
        type: String
    },
    sobreNome:{
        type: String
    }
})

const ObraSchema = new Schema({
    IDO: {
        type: Number,
        min: 100000
    },

    titulo: {
        type: String
    },

    subTitulo: {
        type: String
    },

    textoAuxiliar: {
        type: String
    },

    sumario: {
        type: String
    },

    autoria: [autorSchema],

    ficcao: {
        type: Boolean
    },

    categoria: {
        type: String
    },

    Edicoes:[EdicaoSchema],

}, {collection: 'livros'});

const obra = mongoose.model("obra", ObraSchema)

module.exports = {
    obra, 
    ObraSchema
}