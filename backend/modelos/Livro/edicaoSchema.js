
const { ExemplarSchema } = require("./exemplarSchema");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const EdicaoSchema = new Schema({
    ISBN: {
        type: Number,
        min: 1000000000000,  
        max: 9999999999999
    },
    nomeEdicao: {
        type: String         
    },
    publicadora: {
        type: String         
    },
    anoPublicacao: {
        type: String,
        default: "Português-Brasil" 
    },
    quantidadePaginas: {
        type: Number
    },

    capaFrente: {
        type: String        
    },
    Exemplares: [ExemplarSchema]  
});

module.exports = { EdicaoSchema };
