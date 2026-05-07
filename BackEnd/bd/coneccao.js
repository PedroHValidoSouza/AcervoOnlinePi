const mongoose = require("mongoose"); // Usado para se conectar com o mongo DB

//Função padrão para conecção
async function Conectar() {
    try { // Tenta conectar
        await mongoose.connect("mongodb://bibliotecaSystem:biblio-Zb0jcl!2Psc@localhost:27017/");
    } catch (error) { // Se capitou um erro
        console.log(`Error: ${error}`);
    } finally {// Independente do resultado
        console.log("Connecção foi chamada.");
    }
}

//Aqui exporta o conectar 
module.exports = Conectar