
const mongoose = require("mongoose");


async function Conectar() {
    try {

        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ Banco de dados conectado com sucesso");
    } catch (error) {
        console.error(`❌ Erro na conexão com o banco: ${error.message}`);
        process.exit(1);
    }
}

module.exports = Conectar;
