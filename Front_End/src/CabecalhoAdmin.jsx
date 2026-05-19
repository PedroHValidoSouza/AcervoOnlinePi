

function CabecalhoAdmin() {
    return (
      <header className="admin-header">
        <h1>Painel de Controle</h1>
        <div className="user-info">
          Olá, Administrador | <a href="index.html" className="sair-link">Sair</a>
        </div>
      </header>
    );
  }

  export default CabecalhoAdmin