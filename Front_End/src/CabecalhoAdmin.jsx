

import { Link } from 'react-router-dom'; // <- Adicione o import no topo

function CabecalhoAdmin() {
  return (
    <header className="admin-header">
      <h1>Painel de Controle</h1>
      <div className="user-info">
        Olá, Administrador | <Link to="/" className="sair-link">Sair</Link>
      </div>
    </header>
  );
}

export default CabecalhoAdmin;