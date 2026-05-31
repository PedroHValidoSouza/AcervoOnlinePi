const {Exemplar, ExemplarSchema} = require("../modelos/Livro");
const {Edicao, EdicaoSchema} = require("../modelos/Livro");
const {Livro, LivroSchema} = require("../modelos/Livro");


const LivroController = {

    create: async(requisicao, resposta) => {
        try{
            const Livro = {
                IDP: requisicao.body.IDP,
                titulo: requisicao.body.titulo,
                subTitulo: requisicao.body.subTitulo,
                sumario: requisicao.body.sumario,
                autoria: requisicao.body.autoria,

                categoria: requisicao.body.categoria,
                genero: requisicao.body.genero,
                nivelLiterario: requisicao.body.nivelLiterario,

                Edicoes: requisicao.body.Edicoes,

                View: requisicao.body.View
            };

            const resultado = await LivroSchema.create(Livro);

            resposta.status(201).json({resultado, msg: "Livro cadastrado com exitô."})

        } catch(error) {
            console.log(`Error: ${error}`)
        }
    },
    
    getAll: async(requisicao, resposta) => {
        try {
            const livros = await Livro.find();
            resposta.status(200).json(livros);
        } catch (error) {
            console.log(error);
        }
        
    }

};


module.exports = LivroController;