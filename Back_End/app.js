const express = require("express"); //Permite o uso e processamento de Json
const cors = require('cors'); // Permite o uso da api por uma URl diferente

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