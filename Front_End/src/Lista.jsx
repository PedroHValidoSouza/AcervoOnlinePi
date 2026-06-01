import React from 'react';
 

function Lista({ livros, termoPesquisa }) {
  
  // 1º PASSO: Se a barra estiver vazia, não mostra nada na tela
  if (!termoPesquisa || termoPesquisa.trim() === '') {
    return null; 
  }

  // 2º PASSO: Se digitou algo mas a lista de filtrados é zero, mostra a mensagem
  if (livros.length === 0) {
    return <p className="sem-resultados">Nenhum livro encontrado.</p>;
  }

  // 3º PASSO: Se encontrou livros, renderiza os cards
  return (
    <div className="lista-produtos-container">
      {livros.map((livro, index) => (
        <div key={index} className="livro-card">
          <h3 className="livro-titulo">{livro.titulo}</h3>
          <p className="livro-autor"><strong>Autor:</strong> {livro.autor}</p>
        </div>
      ))}
    </div>
  );
}

export default Lista;