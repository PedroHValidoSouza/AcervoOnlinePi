
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
      <div className="app-container">
        
     <Routes>
          
          {/* ROTA DO USUÁRIO COMUM (Home) */}
          <Route 
            path="/" 
            element={
              <>
                <Cabecalho />
                
                {/* Contêiner principal para alinhar a pesquisa e o botão Admin */}
                <div className="pesquisa-secao-home">
                  <BarraPesquisa valor={termoPesquisa} aoMudar={setTermoPesquisa} />
                  <BotaoAdmin /> 
                </div>

                <Lista livros={livrosFiltrados} termoPesquisa={termoPesquisa} />
              </>
            } 
          />

          {/* ROTA DO ADMINISTRADOR */}
          <Route 
            path="/admin" 
            element={
              <>
                <CabecalhoAdmin />
                <Formulario aoAdicionar={adicionarLivro} />
                
                <div className="pesquisa-secao-home">
                  <BarraPesquisa valor={termoPesquisa} aoMudar={setTermoPesquisa} />
                </div>

                <Lista livros={livrosFiltrados} termoPesquisa={termoPesquisa} />
              </>
            } 
          />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;