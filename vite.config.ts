import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), './src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './src/service'),
      '@type': resolve(__dirname, './src/type'),
      '@utils': resolve(__dirname, './src/utils'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@store': resolve(__dirname, './src/store'),
      '@assets': resolve(__dirname, './src/assets'),
      '@service': resolve(__dirname, './src/service'),
      '@router': resolve(__dirname, './src/router'),
      '@components': resolve(__dirname, './src/components'),
      '@features': resolve(__dirname, './src/features'),
      '@application': resolve(__dirname, './src/application'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
