import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: '/InternalManagementSystem/', //
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'], // 👈 add this
  },
  server: {
    port: 3000
  },
})