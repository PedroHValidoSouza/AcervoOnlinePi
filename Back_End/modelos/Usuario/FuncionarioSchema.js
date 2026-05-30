const mongoose = require("mongoose");
// Mongoose é chamado dessa vez para o uso de Schema's


const { Schema } = mongoose;
// Schema's são a 'blueprint' de um json 

/*
Aqui vai uma explicação: existe um diferença do livro, edição e exemplar.
O livro é a obra intelectual
*/ 
const FuncionarioSchema = new Schema({
    IDF: {
        type: Number
    },

    nome: {
        type: String
    },

    CPF: {
        type: Number
    },
    
    telefone: {
        type: String
    },

    email: {
        type: String
    }
})

const funcionarioSchema = mongoose.model("funcionarioSchema", FuncionarioSchema)

module.exports = {
    funcionarioSchema,
    FuncionarioSchema
}