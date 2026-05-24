
function BarraPesquisa({ onPesquisa }) { // <- Recebe a propriedade onPesquisa aqui
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Pesquisar livros..." 
        className="search-input" 
        onChange={(e) => onPesquisa(e.target.value)} // <- Dispara a busca a cada letra digitada
      />
      <button className="search-btn">🔍</button>
    </div>
  );
}

export default BarraPesquisa;