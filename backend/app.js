
require("dotenv").config();

const express = require("express");


const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const conectar = require("./bd/coneccao");
conectar();

const router = require("./rotas/router");
app.use("/Api/", router);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log(`Biblioteca rodando em http://localhost:${PORTA}/Api/`);
    console.log(` `);
    console.log(`   GET    /Api/livros`);
    console.log(`   POST   /Api/livros`);
    console.log(`   GET    /Api/livros/:idO`);
    console.log(`   PATCH  /Api/livros/:idO`);
    console.log(`   DELETE /Api/livros/:idO`);
    console.log(`   POST   /Api/livros/:idO/edicoes`);
    console.log(`   DELETE /Api/livros/:idO/edicoes/:iSBN`);
    console.log(`   POST   /Api/livros/:idO/edicoes/:iSBN/exemplares`);
    console.log(`   DELETE /Api/livros/:idO/edicoes/:iSBN/exemplares/:idEx`);
});
