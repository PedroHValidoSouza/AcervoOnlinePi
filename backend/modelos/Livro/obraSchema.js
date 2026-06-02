// 741 — ObraSchema é o modelo principal do acervo. Uma "Obra" representa
// um livro de forma abstrata (título, autor, gênero), independente da edição.
// Estrutura: Obra → Edições → Exemplares → Empréstimos
// Essa hierarquia permite que um mesmo livro tenha várias edições,
// e cada edição tenha vários exemplares físicos rastreados individualmente.

const { EdicaoSchema } = require("./edicaoSchema");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// 741 — autorSchema é um sub-documento para armazenar nome e sobrenome
// separados, facilitando buscas e ordenações por sobrenome.
const autorSchema = new Schema({
    nome:      { type: String },
    sobreNome: { type: String }
});

const ObraSchema = new Schema({
    IDO: {
        type: Number,
        min: 100000,   // 741 — ID da Obra: número de 6+ dígitos, definido manualmente
        unique: true,  // 741 — Garante que não existam duas obras com o mesmo IDO
        required: true
    },
    titulo: {
        type: String,
        required: true  // 741 — O título é obrigatório; a API retornará erro sem ele
    },
    subTitulo: {
        type: String    // 741 — Subtítulo opcional (ex: "Uma aventura nas estrelas")
    },
    textoAuxiliar: {
        type: String    // 741 — Texto de contracapa ou apresentação, opcional
    },
    sumario: {
        type: String    // 741 — Resumo/sinopse do livro
    },
    autoria: [autorSchema],  // 741 — Array pois uma obra pode ter múltiplos autores
    ficcao: {
        type: Boolean   // 741 — true = ficção, false = não-ficção
    },
    categoria: {
        type: String    // 741 — Categoria do livro (ex: "Romance", "Ciência")
    },
    Edicoes: [EdicaoSchema]  // 741 — Array de todas as edições desta obra
}, {
    collection: 'livros'  // 741 — Nome exato da collection no MongoDB Atlas/local
});

// 741 — mongoose.model cria (ou reutiliza) o model registrado globalmente.
// O primeiro argumento "obra" é o nome interno do model no Mongoose.
const obra = mongoose.model("obra", ObraSchema);

module.exports = { obra, ObraSchema };
