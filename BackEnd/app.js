const NomeDoProjeto = 'Acervo Online API'

const express = require("express");
const cors = require("cors")
const { MongoClient, ObjectId } = require('mongodb');

const PORTA = 3000;

const app = express();
app.use(cors())
app.use(express.json());

const url = 'mongodb://localhost:27017/';
const nomeDB = "Acervo";
let db;

MongoClient.connect(url)
    .then(client => {
        db = client.db(nomeDB);
        console.log('MongoDb conectou com sucesso.')
    })
    .catch(err =>{
        console.error("Conecção com mongoDB falhou", err)
    })



app.get("/", (requisicao, resposta) => {
    resposta.send(`Seja bem vindo ao ${NomeDoProjeto}; Você parece perdido, digite /help para encontrar ajuda.`);
});

app.get("/help", (requisicao, resposta) => {
    resposta.send(`<h2>${NomeDoProjeto}:</h2><p>Para o Get basta usar /Livros</p><p>Para o Post use /Insert/Livros`);
});

app.get("/Livros", (requisicao, resposta) => {
    const colecao = db.collection('Livros');

    colecao.find({},{ projection: {_id:0}}).toArray()
    .then(Livros =>{
        resposta.status(200).json(Livros);
    })
    .catch(err => {
        resposta.status(500).send("Algo de errado não está certo.")
    })
});

app.get("/Livros/:busca", (requisicao, resposta) => {
    const colecao = db.collection('Livros');
    const busca = requisicao.params.busca

    colecao.find({$or: [{titulo: {$regex: busca, $options: 'i'}}, {subTitulo: {$regex: busca, $options: 'i'}}]},{ projection: {_id:0}}).toArray()
    .then(Livros =>{
        resposta.json(Livros);
        resposta.status(200)
    })
    .catch(err => {
        resposta.status(500).send("Algo de errado não está certo.")
    })
});

app.post("/Insert/Livros", (requisicao, resposta)=>{
    const data = requisicao.body;
    const colecao = db.collection('Livros')

    let livroNovo = {
        titulo: data.titulo,
        subTitulo: data.subTitulo,
        autor: data.autor,
        assunto: data.assunto,
        ISBN: data.ISBN,
        anoPublicacao: data.anoPublicacao,
        existentes: data.existentes,
        disponiveis: data.disponiveis
    }

    colecao.insertOne(livroNovo)
    .then(result =>{
        resposta.status(201).send(`Novo livro inserido: ${result.titulo}`)
    }
    )
})

app.delete('/Delete/Livros/:ISBN',(requisicao, resposta)=>{
    const isbn = requisicao.params.ISBN

    const colecao = db.collection('Livros')
    colecao.findOneAndDelete({ISBN: isbn})
        .then(resultado =>{
            if(resultado.deletedCount === 0){
                resposta.status(404).send("Livro não encontrado")
                return
            }
            resposta.send(`Livro ${ttitulo} foi deletado com exito.`)
        })
        .catch(err =>{
            resposta.status(500).send("Algo de errado não está certo.")
        })
})

app.listen(PORTA, () => {
    console.log(`API aguardando conexões na porta ${PORTA}`);
});