//#region Busca
console.log("Codigo Iniciou");
const buscar_Input = document.getElementById('buscarI');
const resultados = document.getElementById('resultados');

const buscar_botao = document.getElementById('buscarB')//.onclick = pesquisar();

buscar_botao.addEventListener('click',pesquisar)

async function pesquisar(){
    console.log('clicado')
    var texto = buscar_Input.value;
    console.log(texto);
    if (texto.length > 0){
        const url = `http://localhost:3000/Livros/${texto}`;
        try{
            const resposta = await fetch(url)
            if (!resposta.ok) {
                throw new Error(`Response status: ${resposta.status}`);
            }
            const resultado = await resposta.json();

            resultados.innerHTML = '';
            if( resultado.length <= 0){
                const div = document.createElement('div');
                div.innerHTML = `<p>Nenhum livro encontrado!</p>`
                resultados.appendChild(div)
            } else {
                resultado.forEach(livro => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                    <h4>${livro.titulo}</h4>
                    <h5>${livro.subTitulo}</h5>
                    <p>${livro.autor}</p>
                    `;
                    resultados.appendChild(div);
                });
                console.log(resultado); 
            }

        } catch (error) {
            console.error(error.message);
        }
    } else {
        const url = `http://localhost:3000/Livros/`
        try{
            const resposta = await fetch(url)
            if (!resposta.ok) {
                throw new Error(`Response status: ${resposta.status}`);
            }
            const resultado = await resposta.json();

            resultados.innerHTML = '';
            if(resultado.length <= 0){
                const div = document.createElement('div');
                div.innerHTML = `<p>Nenhum livro encontrado!</p>`
                resultados.appendChild(div)
            } else {
                resultado.forEach(livro => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                    <h4>${livro.titulo}</h4>
                    <h5>${livro.subTitulo}</h5>
                    <p>${livro.autor}</p>
                    `;
                    resultados.appendChild(div);
                });
                console.log(resultado);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}
//#endregion

//#region Criar

const input_Titulo = document.getElementById('criarTitulo');
const input_SubTitulo = document.getElementById('criarSubTitulo');
const input_Autor = document.getElementById('criarAutor');
const input_ISBN = document.getElementById('criarISBN');
const input_Lancamento = document.getElementById('criarLancamento');
const input_Copias = document.getElementById('criarCopias');
const botao_Criar = document.getElementById('criarLivro');

botao_Criar.addEventListener('click', PostDados);

function GetDadosFormulario(){
    var Vtitulo = input_Titulo.value;
    var VsubTitulo = input_SubTitulo.value;
    var Vautor = input_Autor.value;
    var Visbn = input_ISBN.value;
    var Vlancamento  = input_Lancamento.value;
    var Vcopias = input_Copias.value;

    const livro = {
        titulo: Vtitulo,
        subTitulo: VsubTitulo,
        autor: Vautor,
        assuntos: [],
        ISBN: Visbn,
        anoPublicacao: new Date(Vlancamento, 0, 1),
        existentes: Vcopias,
        disponiveis: Vcopias
    };

    return livro;
}

function PostDados(){
    const url = 'http://localhost:3000/Insert/Livros'
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(GetDadosFormulario()) // Converte objeto para string JSON
    })
    //.then(response => response.json()) // Converte a resposta em JSON
    .then(data => console.log(data))
    .catch(error => console.error(error.message));
}

//#endregion

//#region Modificar
//#endregion