// 741 — Configuração do Vite (bundler do frontend).
// O proxy redireciona chamadas de /Api/* para o backend em localhost:3000,
// evitando erros de CORS durante o desenvolvimento local.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 741 — Proxy: toda requisição do frontend que começa com /Api
    // é redirecionada para http://localhost:3000. Isso significa que
    // no código React você pode usar fetch('/Api/livros') sem colocar
    // o endereço completo do backend.
    proxy: {
      '/Api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
