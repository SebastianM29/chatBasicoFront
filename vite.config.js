import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // AÑADE ESTE OBJETO PARA CONFIGURAR EL PROXY
  server: {
    // Si tienes que usar el puerto 5173, déjalo. Si no, omítelo.
    port: 5173, 
    proxy: {
      // 1. Cuando tu frontend llame a cualquier ruta que empiece con '/admin',
      //    la reenviará al puerto 3000 de Express.
      '/admin': {
        target: 'http://localhost:3000',
        changeOrigin: true, // Esto es crucial: engaña al servidor para que crea que la petición viene del mismo puerto
        secure: false,      // Asegura que funcione en HTTP
      },
    },
  },
})