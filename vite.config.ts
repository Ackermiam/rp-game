import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/rp-game',
  plugins: [vue()],
  build: {
    assetsInclude: ['./src/assets/**']
  }
})