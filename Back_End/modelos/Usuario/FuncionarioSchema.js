const mongoose = require("mongoose");
const { Schema } = mongoose;

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