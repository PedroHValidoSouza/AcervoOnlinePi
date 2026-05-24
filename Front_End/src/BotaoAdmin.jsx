
import { Link } from 'react-router-dom'; // <- Adicione o import no topo

function BotaoAdmin() {
  return (
    <div className="admin-container">
      {/* Trocamos <a href="..."> por <Link to="..."> */}
      <Link to="/admin" className="admin-link">Admin</Link>
    </div>
  );
}

export default BotaoAdmin;