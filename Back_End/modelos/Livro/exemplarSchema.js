
const mongoose = require("mongoose");
const { Schema } = mongoose;


const EmprestimoSchema = new Schema({ 
    CPF: {
        type: Number,
        min: 1000000000000
    },
    
    dataEmprestimo: {
        type: Date,
        default: Date.now
    },

    dataDevolucao: {
        type: Date
    }

});

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

    dataCadastro: {
        type: Date,
        default: Date.now
    },

    emprestimo: [EmprestimoSchema],

    filaEspera: [Number]
    
});

module.exports = {
    ExemplarSchema
}