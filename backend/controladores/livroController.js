// 741 — LivroController centraliza toda a lógica de negócio relacionada a livros.
// Cada função corresponde a uma operação CRUD (Create, Read, Update, Delete).
// O controller recebe (requisicao, resposta) do Express e interage com o MongoDB
// via o model Mongoose "obra".

const { obra } = require("../modelos/Livro/obraSchema.js");

const livroController = {

    // =========================================================================
    // 741 — CREATE: Cria uma nova obra completa no banco.
    // Rota: POST /Api/livros
    // Body esperado: objeto JSON seguindo o ObraSchema (veja LivroExemplo.json)
    // =========================================================================
    create: async (requisicao, resposta) => {
        try {
            // 741 — Instancia um novo documento Mongoose com os dados recebidos no body.
            // O Mongoose validará automaticamente os campos conforme o Schema.
            const novaObra = new obra(requisicao.body);

            // 741 — .save() persiste o documento no MongoDB e retorna o documento salvo.
            await novaObra.save();

            // 741 — Status 201 = "Created". Retorna o documento criado com seu _id do Mongo.
            resposta.status(201).json({ mensagem: "Livro criado com sucesso", livro: novaObra });
        } catch (error) {
            // 741 — Status 400 = "Bad Request". Retorna a mensagem de erro de validação do Mongoose.
            resposta.status(400).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — GET ALL: Retorna todos os livros do acervo.
    // Rota: GET /Api/livros
    // Sem parâmetros. Retorna array JSON com todas as obras.
    // =========================================================================
    get: async (requisicao, resposta) => {
        try {
            // 741 — obra.find() sem argumentos retorna todos os documentos da collection "livros".
            const livros = await obra.find();
            resposta.status(200).json(livros);
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — GET BY IDO: Busca uma obra específica pelo campo IDO.
    // Rota: GET /Api/livros/:idO
    // Parâmetro de rota: idO (número da obra, ex: 100001)
    // =========================================================================
    getById: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;

            // 741 — findOne com filtro { IDO: Number(idO) } busca o documento com IDO exato.
            // Number() converte o parâmetro string da URL para número, que é o tipo do Schema.
            const livro = await obra.findOne({ IDO: Number(idO) });

            if (!livro) {
                // 741 — Status 404 = "Not Found". Retorna mensagem clara de não encontrado.
                return resposta.status(404).json({ mensagem: "Livro não encontrado" });
            }

            resposta.status(200).json(livro);
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — UPDATE: Substitui os dados de uma obra existente pelo IDO.
    // Rota: PATCH /Api/livrosUpd/:idO
    // Parâmetro de rota: idO
    // Body: campos a atualizar (parcial ou completo)
    // =========================================================================
    update: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;

            // 741 — findOneAndUpdate busca pelo IDO e aplica os dados do body.
            // { new: true } retorna o documento JÁ atualizado (não o antigo).
            // { runValidators: true } garante que as validações do Schema sejam aplicadas.
            const obraAtualizada = await obra.findOneAndUpdate(
                { IDO: Number(idO) },
                requisicao.body,
                { new: true, runValidators: true }
            );

            if (!obraAtualizada) {
                return resposta.status(404).json({ mensagem: "Livro não encontrado" });
            }

            resposta.status(200).json({ mensagem: "Livro atualizado com sucesso", livro: obraAtualizada });
        } catch (error) {
            resposta.status(400).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — DELETE: Remove uma obra pelo IDO.
    // Rota: DELETE /Api/livrosDel/:idO
    // Parâmetro de rota: idO
    // =========================================================================
    delete: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;

            // 741 — findOneAndDelete localiza e remove em uma única operação atômica.
            // Retorna o documento removido ou null se não encontrado.
            const livroRemovido = await obra.findOneAndDelete({ IDO: Number(idO) });

            if (!livroRemovido) {
                return resposta.status(404).json({ mensagem: "Livro não encontrado" });
            }

            resposta.status(200).json({ mensagem: "Livro removido com sucesso" });
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — ADD EDICAO: Adiciona uma nova edição a uma obra existente.
    // Rota: POST /Api/livros/:idO/edicoes
    // Body: objeto EdicaoSchema (com ISBN, publicadora, etc.)
    // =========================================================================
    createEdicao: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;
            const novaEdicao = requisicao.body;

            // 741 — $push adiciona um elemento ao array "Edicoes" sem substituir as existentes.
            const livroAtualizado = await obra.findOneAndUpdate(
                { IDO: Number(idO) },
                { $push: { Edicoes: novaEdicao } },
                { new: true }
            );

            if (!livroAtualizado) {
                return resposta.status(404).json({ mensagem: "Obra não encontrada" });
            }

            resposta.status(201).json({ mensagem: "Edição adicionada com sucesso", livro: livroAtualizado });
        } catch (error) {
            resposta.status(400).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — ADD EXEMPLAR: Adiciona um exemplar físico a uma edição específica.
    // Rota: POST /Api/livros/:idO/edicoes/:iSBN/exemplares
    // Parâmetros: idO (IDO da obra), iSBN (ISBN da edição)
    // Body: objeto ExemplarSchema (IDEx, disponivel, localizacao)
    // =========================================================================
    createExemplar: async (requisicao, resposta) => {
        try {
            const { idO, iSBN } = requisicao.params;
            const novoExemplar = requisicao.body;

            // 741 — O filtro usa IDO da obra E ISBN da edição para localizar
            // o sub-documento correto. "Edicoes.$.Exemplares" usa o operador posicional
            // $ que representa a primeira edição que casou com o filtro.
            const livroAtualizado = await obra.findOneAndUpdate(
                { IDO: Number(idO), "Edicoes.ISBN": Number(iSBN) },
                { $push: { "Edicoes.$.Exemplares": novoExemplar } },
                { new: true }
            );

            if (!livroAtualizado) {
                return resposta.status(404).json({ mensagem: "Obra ou edição não encontrada" });
            }

            resposta.status(201).json({ mensagem: "Exemplar adicionado com sucesso", livro: livroAtualizado });
        } catch (error) {
            resposta.status(400).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — DELETE EDICAO: Remove uma edição de uma obra pelo ISBN.
    // Rota: DELETE /Api/livros/:idO/edicoes/:iSBN
    // =========================================================================
    deleteEdicao: async (requisicao, resposta) => {
        try {
            const { idO, iSBN } = requisicao.params;

            // 741 — $pull remove do array "Edicoes" todos os elementos cujo ISBN bata.
            const resultado = await obra.findOneAndUpdate(
                { IDO: Number(idO) },
                { $pull: { Edicoes: { ISBN: Number(iSBN) } } },
                { new: true }
            );

            if (!resultado) {
                return resposta.status(404).json({ mensagem: "Edição não encontrada" });
            }

            resposta.status(200).json({ mensagem: "Edição removida com sucesso" });
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    },

    // =========================================================================
    // 741 — DELETE EXEMPLAR: Remove um exemplar físico de uma edição.
    // Rota: DELETE /Api/livros/:idO/edicoes/:iSBN/exemplares/:idEx
    // =========================================================================
    deleteExemplar: async (requisicao, resposta) => {
        try {
            const { idO, iSBN, idEx } = requisicao.params;

            // 741 — Duplo filtro: localiza a obra pelo IDO e a edição pelo ISBN.
            // O $pull remove do array "Edicoes.$.Exemplares" o exemplar com IDEx correspondente.
            const resultado = await obra.findOneAndUpdate(
                { IDO: Number(idO), "Edicoes.ISBN": Number(iSBN) },
                { $pull: { "Edicoes.$.Exemplares": { IDEx: Number(idEx) } } },
                { new: true }
            );

            if (!resultado) {
                return resposta.status(404).json({ mensagem: "Exemplar não encontrado" });
            }

            resposta.status(200).json({ mensagem: "Exemplar removido com sucesso" });
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    }
};

module.exports = livroController;
