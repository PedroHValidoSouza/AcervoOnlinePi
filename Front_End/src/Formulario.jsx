
import React, { useState } from 'react';

function Formulario({ onAdicionarLivro }) {
    const [titulo, setTitulo] = React.useState('');
    const [autor, setAutor] = React.useState('');
    const [data, setData] = React.useState('');
  
    const enviarFormulario = (e) => {
      e.preventDefault();
      onAdicionarLivro({ titulo, autor, data });
      // Limpa os campos após salvar
      setTitulo('');
      setAutor('');
      setData('');
    };
  
    return (
      <div className="admin-card">
        <h3>Inserir Novo Livro</h3>
        <form onSubmit={enviarFormulario}>
          <div className="form-group">
            <label>Título do Livro</label>
            <input 
              type="text" 
              placeholder="Inserir Título" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Autor</label>
            <input 
              type="text" 
              placeholder="Insira o Nome do Autor" 
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Data de Lançamento</label>
            <input 
              type="date" 
              value={data}
              onChange={(e) => setData(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Salvar Livro</button>
        </form>
      </div>
    );
  }

  export default Formulario