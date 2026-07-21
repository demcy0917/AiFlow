import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
    // El bot y el formulario viven en el Worker. Con `npm run dev:api`
    // corriendo en paralelo, estas rutas llegan a Hono en vez de dar 404.
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})
