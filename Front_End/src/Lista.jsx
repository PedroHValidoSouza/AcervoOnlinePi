
function Lista ({ livros }) {
    return (
      <div className="search-section">
        <h3>Livros Registrados</h3>
        <div id="bookList">
          {livros.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center' }}>Nenhum livro registrado no momento.</p>
          ) : (
            livros.map((livro, index) => (
              <div key={index} className="book-item">
                <div>
                  <strong>{livro.titulo}</strong> - {livro.autor}
                </div>
                <span>Lançado em: {livro.data}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  
  export default Lista