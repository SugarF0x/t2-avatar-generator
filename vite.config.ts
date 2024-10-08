import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({ defaultSFCLang: 'yaml' }),
    ViteImageOptimizer({})
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  ssr: {
    noExternal: [/vue-i18n/]
  }
})
