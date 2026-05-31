const {obra, ObraSchema} = require("../modelos/Livro/obraSchema.js")

const livroController = {
    create: async(requisicao, resposta) => {
        try{
            const livro = obra(requisicao.body);
            await livro.save()
            resposta.status(201)
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    },

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
        res.status(200).json(livros);

        } catch(error) {
            console.log(error);
        }
    }
    
}