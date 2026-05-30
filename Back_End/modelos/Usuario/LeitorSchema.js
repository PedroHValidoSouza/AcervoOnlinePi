const mongoose = require("mongoose");
// Mongoose é chamado dessa vez para o uso de Schema's

const { Schema } = mongoose;
// Schema's são a 'blueprint' de um json 


const LeitorSchema = new Schema({

    CPF: {
        type: Number,
        min: 10000000000
    },
    
    nome: {
        type: String
    },

    telefone: {
        type: String
    },

    email: {
        type: String
    },





    infrator: {
        type: Boolean
    },
    especial: {
        type: Boolean
    }
})

const leitorSchema = mongoose.model("leitorSchema", LeitorSchema)

module.exports = {
    leitorSchema,
    LeitorSchema
}