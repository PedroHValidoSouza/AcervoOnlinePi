// 741 — Schema de Empréstimo: registra quem pegou o exemplar e as datas.
// CPF com mínimo de 11 dígitos (sem formatação) representado como Number.

const mongoose = require("mongoose");
const { Schema } = mongoose;

// 741 — EmprestimoSchema é um sub-documento embutido dentro de ExemplarSchema.
// Cada exemplar pode ter um histórico de múltiplos empréstimos.
const EmprestimoSchema = new Schema({
    CPF: {
        type: Number,
        min: 10000000000  // 741 — CPF com 11 dígitos mínimo (sem pontos/traços)
    },
    dataEmprestimo: {
        type: Date,
        default: Date.now  // 741 — Preenche automaticamente com a data/hora atual
    },
    dataDevolucao: {
        type: Date         // 741 — Nulo enquanto o livro não foi devolvido
    }
});

// 741 — ExemplarSchema representa uma cópia física do livro no acervo.
// Um livro pode ter várias edições, e cada edição pode ter vários exemplares.
const ExemplarSchema = new Schema({
    IDEx: {
        type: Number       // 741 — Identificador numérico único do exemplar físico
    },
    disponivel: {
        type: Boolean      // 741 — true = disponível para empréstimo, false = emprestado
    },
    localizacao: {
        type: String       // 741 — Posição física na biblioteca (ex: "Estante B, Prateleira 3")
    },
    dataCadastro: {
        type: Date,
        default: Date.now  // 741 — Data em que o exemplar foi inserido no sistema
    },
    emprestimo: [EmprestimoSchema],  // 741 — Histórico de todos os empréstimos do exemplar
    filaEspera: [Number]             // 741 — CPFs de leitores na fila de espera pelo exemplar
});

module.exports = { ExemplarSchema };
