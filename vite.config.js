import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react-hook-form']
  },
  server:{
    proxy:{
      '/api' : 'http://localhost:3000',
    },
  },
  plugins: [react()],

  
})


