// 741 — main.jsx é o ponto de entrada do React.
// Ele monta o componente raiz <App /> dentro do elemento #root do index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 741 — StrictMode ativa verificações extras de desenvolvimento no React
// (detecta efeitos colaterais e APIs obsoletas). Não afeta a produção.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
