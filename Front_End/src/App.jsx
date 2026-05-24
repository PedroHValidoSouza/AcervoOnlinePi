
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Cabecalho from './Cabecalho';
import CabecalhoAdmin from './CabecalhoAdmin';
import Formulario from './Formulario';
import Lista from './Lista';
import BarraPesquisa from './BarraPesquisa';
import BotaoAdmin from './BotaoAdmin';

function App() {
  // Lista começa vazia conforme solicitado
  const [livros, setLivros] = useState([]);
  
  // Estado para guardar o que o usuário digita na busca
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const adicionarLivro = (novoLivro) => {
    setLivros([...livros, novoLivro]);
  };

  // Filtra os livros apenas se o usuário tiver digitado alguma coisa
  const livrosFiltrados = termoPesquisa.trim() === '' 
    ? [] // Se estiver vazio, não mostra nenhum livro
    : livros.filter(livro => 
        livro.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        livro.autor.toLowerCase().includes(termoPesquisa.toLowerCase())
      );

  return (
    <BrowserRouter>
      <Routes>
        
        {/* ROTA DO USUÁRIO */}
        <Route 
        path="/" 
          element = {<>
      <Cabecalho /> {/* <--- Garanta que essa linha está aqui! */}
      
      <div className="toolbar">
        <BarraPesquisa onPesquisa={setTermoPesquisa} />
        <BotaoAdmin />
      </div>
      
      {termoPesquisa.trim() !== '' && (
        <Lista livros={livrosFiltrados} />
      )}
         </>
        } 
       />

        {/* ROTA DO ADMIN */}
        <Route 
          path="/admin" 
          element={
            <div className="admin-page-container" style={{ padding: '20px' }}>
              <CabecalhoAdmin />
              <Formulario onAdicionarLivro={adicionarLivro} />
              {/* No Admin, se você quiser ver todos os livros sempre, passe 'livros'. Se não quiser ver nada, pode remover a linha abaixo */}
              <Lista livros={livros} /> 
            </div>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;