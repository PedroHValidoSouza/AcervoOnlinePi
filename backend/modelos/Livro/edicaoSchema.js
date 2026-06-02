// 741 — Schema de Edição: representa uma edição específica de uma obra.
// Uma mesma obra (ex: "Dom Casmurro") pode ter edições de editoras e anos diferentes.
// Cada edição possui seu próprio ISBN, publicadora, idioma e lista de exemplares físicos.

const { ExemplarSchema } = require("./exemplarSchema");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const EdicaoSchema = new Schema({
    ISBN: {
        type: Number,
        min: 1000000000000,  // 741 — ISBN-13: exatamente 13 dígitos numéricos
        max: 9999999999999
    },
    nomeEdicao: {
        type: String         // 741 — Ex: "2ª Edição Revisada", pode ser vazio
    },
    publicadora: {
        type: String         // 741 — Nome da editora responsável por esta edição
    },
    anoPublicacao: {
        type: Date           // 741 — Armazenado como Date; no front use apenas o ano (YYYY-01-01)
    },
    lingua: {
        type: String,
        default: "Português-Brasil"  // 741 — Idioma padrão; altere se necessário
    },
    quantidadePaginas: {
        type: Number         // 741 — Número total de páginas desta edição
    },
    capaFrente: {
        type: String         // 741 — URL ou base64 da imagem da capa; pode ser vazio
    },
    Exemplares: [ExemplarSchema]  // 741 — Array de exemplares físicos desta edição
});

module.exports = { EdicaoSchema };
