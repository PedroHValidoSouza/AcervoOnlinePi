import React from 'react';


function BarraPesquisa({ valor, aoMudar }) {
  return (
    <div className="barra-pesquisa-wrapper">
      <input
        type="text"
        placeholder="Pesquisar livros..."
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        className="barra-pesquisa-input"
      />
      <button className="barra-pesquisa-botao">🔍</button>
    </div>
  );
}

export default BarraPesquisa;