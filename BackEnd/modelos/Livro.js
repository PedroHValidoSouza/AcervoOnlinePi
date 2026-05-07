const mongoose = require("mongoose");
// Mongoose é chamado dessa vez para o uso de Schema's


const { Schema } = mongoose;
// Schema's são a 'blueprint' de um json 

/*
Aqui vai uma explicação: existe um diferença do livro, edição e exemplar.
O livro é a obra intelectual
*/ 
const ExemplarSchema = new Schema({
    IDEx: {
        type: Number
    },

    disponivel: {
        type: Boolean
    },

    localizacao: {
        type: String
    },

    DataCadastro: {
        type: Date,
        default: Date.now
    },

    emprestimo: {
        type: Number,
        min: 1000000000000
    },

    filaEspera:Array[Number]
});

const EdicaoSchema = new Schema({
    ISBN: {
        type: Number,
        min: 1000000000000,
        max: 9999999999999
    },

    nomeEdicao: {
        type:String
    },

    publicadora: {
        type:String
    },

    anoPublicacao:{
        type:Date
    },

    tipo:{
        type:String
    },

    lingua: {
        type:String
    },

    quantidadePaginas: {
        type: Number
    },

    Exemplares: {
        type: Array[ExemplarSchema]
    }
});

const LivroSchema = new Schema({
    IDP: {
        type: Number,
        min: 100000
    },

    titulo: {
        type: String
    },

    subTitulo: {
        type: String
    },

    sumario: {
        type: String
    },

    autoria: {
        type: Array[{
            nome:{
                type: String
            },
            sobreNome:{
                type: String
            }
        }]
    },

    categoria: {
        type: String
    },

    genero: {
        type: String
    },

    nivelLiterario:{
        type: String
    },

    Edicoes:{
        type: Array[EdicaoSchema]
    },

    View:{
        Pesquidado:{
            type: Number
        },

        Almeijado:{
            type: Number
        },

        pontosPositivos:{
            type: Number
        },
        pontosNegativos:{
            type:Number
        }
    }
});

const Exemplar = mongoose.model("Exemplar", ExemplarSchema);
const Edicao = mongoose.model("Edicao", EdicaoSchema);
const Livro = mongoose.model("Livro", LivroSchema);

module.exports = {
    Exemplar,
    ExemplarSchema,
    Edicao,
    EdicaoSchema,
    Livro,
    LivroSchema
}

