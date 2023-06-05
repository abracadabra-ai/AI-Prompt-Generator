import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) // 环境变量

  return {
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
        '/category': {
          target: env.VITE_TARGET,
        },
        '/card': {
          target: env.VITE_TARGET,
        },
        '/case': {
          target: env.VITE_TARGET,
        },
        '/type': {
          target: env.VITE_TARGET,
        },
      }
    }
  }
})
