const express = require("express");
const cors = require('cors'); // Para o uso da api por uma URl diferente

var app = express();
app.use(cors());

app.use(express.json());


var nomeDoProjeto = "API-Biblioteca";
const Porta = 3000;

const conneccao = require("./bd/coneccao");

conneccao();

const router = require('./rotas/router');

app.use("/API/", router);

app.listen(Porta, () => {
    console.log(`${nomeDoProjeto} aguardando conexões na porta ${Porta}`);
});