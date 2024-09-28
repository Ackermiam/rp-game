import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/rp-game',  // Remplacez par le nom exact de votre repository
  plugins: [vue()],
  build: {
    assetsInclude: ['./src/assets/**']
  }
})