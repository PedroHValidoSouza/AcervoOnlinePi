
const { obra } = require("../modelos/Livro/obraSchema.js");

const livroController = {


    create: async (requisicao, resposta) => {
        try {
            const novaObra = new obra(requisicao.body);

            await novaObra.save();

            resposta.status(201).json({ mensagem: "Livro criado com sucesso", livro: novaObra });
        } catch (error) {
            resposta.status(400).json({ erro: error.message });
        }
    },

    get: async (requisicao, resposta) => {
        try {
            const livros = await obra.find();
            resposta.status(200).json(livros);
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    },

    getById: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;

            const livro = await obra.findOne({ IDO: Number(idO) });

            if (!livro) {
                return resposta.status(404).json({ mensagem: "Livro não encontrado" });
            }

            resposta.status(200).json(livro);
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    },

    update: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;

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

    delete: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;

            const livroRemovido = await obra.findOneAndDelete({ IDO: Number(idO) });

            if (!livroRemovido) {
                return resposta.status(404).json({ mensagem: "Livro não encontrado" });
            }

            resposta.status(200).json({ mensagem: "Livro removido com sucesso" });
        } catch (error) {
            resposta.status(500).json({ erro: error.message });
        }
    },

    createEdicao: async (requisicao, resposta) => {
        try {
            const { idO } = requisicao.params;
            const novaEdicao = requisicao.body;

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

    createExemplar: async (requisicao, resposta) => {
        try {
            const { idO, iSBN } = requisicao.params;
            const novoExemplar = requisicao.body;

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

    deleteEdicao: async (requisicao, resposta) => {
        try {
            const { idO, iSBN } = requisicao.params;

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

    deleteExemplar: async (requisicao, resposta) => {
        try {
            const { idO, iSBN, idEx } = requisicao.params;

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
