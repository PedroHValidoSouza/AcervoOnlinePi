const express = require("express"); //Permite o uso e processamento de Json
const cors = require('cors'); // Permite o uso da api por uma URl diferente

var app = express();
app.use(cors());

app.use(express.json());


var NomeDoProjeto = "BibliotecAPI";
const Porta = 3000;

const URL = 'mongodb://localhost:27017/';

const conneccao = require("./bd/coneccao");

conneccao();

app.listen(Porta, () => {
    console.log(`${NomeDoProjeto} aguardando conexões na porta ${Porta}`);
});