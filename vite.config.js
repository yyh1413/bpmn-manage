import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5170,
    proxy: {
      // 代理所有以 /api 开头的请求
      '/api': {
        // target: 'http://192.168.209.78:9999/', // 目标服务器地址
        target: 'http://192.168.71.78:9999/', // 目标服务器地址
        changeOrigin: true, // 是否改变源地址
        rewrite: path => path.replace(/^\/api/, '') // 重写路径（可选）
      }
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      imports: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@p': fileURLToPath(new URL('./src/views/process', import.meta.url))
    }
  },
})
