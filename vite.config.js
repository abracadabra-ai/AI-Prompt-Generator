import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus(), // elementUI 样式
    // ElementPlus懒加载
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // ElementPlus懒加载
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  server: {
    proxy: {
      '/youdao': {
        target: 'https://openapi.youdao.com/api',
        changeOrigin: true,
      },
    }
  }
})
