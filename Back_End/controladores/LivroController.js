const {obra, ObraSchema} = require("../modelos/Livro/obraSchema.js")

const livroController = {
    //#region creates
    create: async(requisicao, resposta) => {
        try{
            const livro = obra(requisicao.body);
            await livro.save()
            resposta.status(201).resposta("Livro criado com exito")
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    },

    create_edicao: async(requisicao, resposta) => {
        try{
            const { idO } = req.params;
            const novaEdicao = req.body; // Deve conter todos os campos de edição conforme schema

            const livroAtualizado = await Livro.findOneAndUpdate(
              { IDO: idO },
              { $push: { Edicoes: novaEdicao } },
              { new: true }
            );
        
            if (!livroAtualizado) {
              return res.status(404).json({ message: "Livro não encontrado" });
            }
        
            res.status(201).resposta({"Status": "Edicao criada com exito"}).json(livroAtualizado);
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    },

    create_exemplar: async(requisicao, resposta) => {
        try{
            const { idO, iSBN } = req.params;
            const novoExemplar = req.body; // Deve conter campos de exemplar conforme schema
                
            const livroAtualizado = await Livro.findOneAndUpdate(
              { IDO: ido, "Edicoes.ISBN": Number(iSBN) },
              { $push: { "Edicoes.$.Exemplares": novoExemplar } },
              { new: true }
            );
        
            if (!livroAtualizado) {
              return res.status(404).json({ message: "Livro ou edição não encontrada" });
            }
        
            resposta.status(201).resposta("Exemplar criado com exito")
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    },
    //#endregion

    get: async(requisicao, resposta) => {
        try {
            const livros = await obra.find();
            resposta.status(200).json(livros);
        } catch(error) {
            console.log(error);
        }
    },

    getParams: async(requisicao, resposta) => {
        const Campos = [
        'IDO', 
        'titulo', 
        'subTitulo', 
        'textoAuxiliar', 
        'sumario',
        'autoria.nome',
        'autoria.sobreNome',
        'ficcao',
        'categoria',
        'Edicoes.ISBN',
        'Edicoes.nomeEdicao',
        'Edicoes.publicadora',
        'Edicoes.anoPublicacao',

        'Edicoes.lingua',
        'Edicoes.Exemplares.IDEx',
        'Edicoes.Exemplares.disponivel',
        'Edicoes.Exemplares.emprestimo.CPF',
        'Edicoes.Exemplares.emprestimo.dataEmprestimo',
        'Edicoes.Exemplares.emprestimo.dataDevolucao'
        ]; // Campos 'padrao'


        try{
        const filtro = {};

        //#region Datas
        // Ano publicacao
        const anoPublicacaoMin = requisicao.query['Edicoes.anoPublicacaoMin']
        const anoPublicacaoMax = requisicao.query['Edicoes.anoPublicacaoMax']
        if (anoPublicacaoMin || anoPublicacaoMax) {
            filtro['Edicoes.anoPublicacao'] = {};
            if (anoPublicacaoMin) filtro['Edicoes.anoPublicacao'].$gte = new Date(anoPublicacaoMin);
            if (anoPublicacaoMax) filtro['Edicoes.anoPublicacao'].$lte = new Date(anoPublicacaoMax);
        }

        //data Emprestimo
        const dataEmprestimoMin = requisicao.query['Edicoes.Exemplares.emprestimo.dataEmprestimoMin']
        const dataEmprestimoMax = requisicao.query['Edicoes.Exemplares.emprestimo.dataEmprestimoMax']
        if (dataEmprestimoMin || dataEmprestimoMax) {
            filtro['Edicoes.Exemplares.emprestimo.dataEmprestimo'] = {};
            if (dataEmprestimoMin) filtro['Edicoes.Exemplares.emprestimo.dataEmprestimo'].$gte = new Date(dataEmprestimoMin);
            if (dataEmprestimoMax) filtro['Edicoes.Exemplares.emprestimo.dataEmprestimo'].$lte = new Date(dataEmprestimoMax);
        }

        //data devolução
        const dataDevolucaoMin = requisicao.query['Edicoes.Exemplares.emprestimo.dataDevolucaoMin']
        const dataDevolucaoMax = requisicao.query['Edicoes.Exemplares.emprestimo.dataDevolucaoMax']
        if (dataDevolucaoMin || dataDevolucaoMax) {
            filtro['Edicoes.Exemplares.emprestimo.dataDevolucao'] = {};
            if (dataDevolucaoMin) filtro['Edicoes.Exemplares.emprestimo.dataDevolucao'].$gte = new Date(dataDevolucaoMin);
            if (dataDevolucaoMax) filtro['Edicoes.Exemplares.emprestimo.dataDevolucao'].$lte = new Date(dataDevolucaoMax);
        }
        //#endregion

        for (const campo of Campos) {
            // Aqui verifica se veio algum parâmetro na query string ou body (use req.query ou req.body conforme necessário)
            if (req.query[campo] !== undefined) {
                // Normalização para numbers/boolean (adicione outros casos se quiser)
                if (['IDO', 'Edicoes.ISBN', 'Edicoes.Exemplares.IDEx', 'Edicoes.Exemplares.emprestimo.CPF', 'Edicoes.quantidadePaginas'].includes(campo)) {
                    filtro[campo] = Number(req.query[campo]);
                } else if (['ficcao', 'Edicoes.Exemplares.disponivel'].includes(campo)) {
                    filtro[campo] = req.query[campo] === "true" || req.query[campo] === true;

                } else {
                    filtro[campo] = req.query[campo];
                }
            }
        }

        const livros = await Livro.find(filtro);
            if (livros == []){
                res.status(404).json({"Status": "Não Encontrado"})
            } else {
                res.status(200).json(livros);
            }

        } catch(error) {
            console.log(error);
        }
    },

    update: async(requisicao, resposta) => {
        try {
            const { idO } = req.params;
            // O body deve conter todo objeto obra! (incluindo Edicoes, autoria, etc.)
            const novaObra = req.body;

            // Substitui todos os campos da obra menos o _id do Mongo
            const obraAtualizada = await Livro.findOneAndUpdate(
              { IDO: idO },
              novaObra,
              { new: true, overwrite: true }
            );

            if (!obraAtualizada) {
              return res.status(404).json({ "Status": "Livro não encontrada" });
            }
            res.status(200).json(obraAtualizada);
        } catch(error) {
            console.log(error);
        }
    },

    //#region Deletes
    delete: async(requisicao, resposta) => {
        try{
            const livroRemovido = await Livro.findOneAndDelete({IDO:requisicao.params.idO})
            if (!livroRemovido) {
                return res.status(404).json({"Status": "Livro Não Encontrado"});
            }
            res.status(200).json({ message: "Livro removido com sucesso" });
        } catch(error) {
            console.log(error);
        }
    },

    delete_edicao: async(requisicao, resposta) => {
        try{
            const idO = requisicao.params.idO;
            const iSBN = requisicao.params.iSBN;
            
            const resultado = await Livro.findOneAndUpdate(
                { IDO: idO },
                { $pull: { Edicoes: { ISBN: Number(iSBN) } } },
                { new: true }
            );

            if (!resultado) {
                return res.status(404).json({"Status": "Edição Não Encontrado"});
            }
            res.status(200).json({ "Status": "Edição removido com sucesso" });
        } catch(error) {
            console.log(error);
        }
    },

    delete_exemplar: async(requisicao, resposta) => {
        try{
            const { idO, iSBN, idEx } = req.params;

            // Localiza o livro pela obra (IDO) e edição (ISBN), depois faz $pull no array Exemplares dentro da edição correta
            const resultado = await Livro.findOneAndUpdate(
              { IDO: idO, "Edicoes.ISBN": Number(iSBN) },
              { $pull: { "Edicoes.$.Exemplares": { IDEx: Number(idEx) } } },
              { new: true }
            );
        
            if (!resultado) {
              return res.status(404).json({"Status": "Exemplar Não Encontrado"});
            }
            res.status(200).json({ "Status": "Exemplar removido com sucesso", livro: resultado });
        } catch(error) {
            console.log(error);
        }
    }
    //#endregion
}

module.exports = livroController;