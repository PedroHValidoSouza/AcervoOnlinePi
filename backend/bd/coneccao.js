// 741 — Este arquivo é responsável por estabelecer a conexão com o MongoDB.
// Ele utiliza o Mongoose, que é uma biblioteca ODM (Object Data Modeling)
// que facilita a comunicação entre o Node.js e o banco MongoDB.

const mongoose = require("mongoose");

// 741 — A função Conectar é assíncrona (async) pois a conexão com o banco
// pode demorar um tempo indeterminado. O await garante que o código espere
// a conexão ser estabelecida antes de continuar.
async function Conectar() {
    try {
        // 741 — strictQuery: true faz com que o Mongoose ignore campos que não
        // estejam definidos no Schema, evitando dados sujos no banco.
        mongoose.set("strictQuery", true);

        // 741 — process.env.MONGO_URI lê a string de conexão do arquivo .env,
        // mantendo credenciais fora do código-fonte (boa prática de segurança).
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ Banco de dados conectado com sucesso");
    } catch (error) {
        // 741 — Em caso de falha na conexão, o erro é exibido no console
        // e o processo Node é encerrado para evitar que a API rode sem banco.
        console.error(`❌ Erro na conexão com o banco: ${error.message}`);
        process.exit(1);
    }
}

// 741 — Exporta a função para que o app.js possa chamá-la na inicialização.
module.exports = Conectar;
