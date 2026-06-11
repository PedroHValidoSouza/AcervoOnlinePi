
const mongoose = require("mongoose");


async function Conectar() {
    try {

        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Conectado com sucesso");
    } catch (error) {
        console.error(`Erro na conexão: ${error.message}`);
    }
}

module.exports = Conectar;
