import { defineConfig, loadEnv } from 'vite'
import { handleEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/plugins'
import { buildOptions } from './build/vite/build'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = handleEnv(env)
  const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv

  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types',
        // moment改为dayjs
        // 'rc-picker/es/generate/moment': 'rc-picker/es/generate/dayjs'
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        },
      },
    },
    server: {
      open: true,
      port: VITE_SERVER_PORT,
      // 跨域处理
      proxy: createProxy(VITE_PROXY)
    },
    // 去除console和debugger
    esbuild: {
      pure: ["console.log", "debugger"]
    },
    build: buildOptions()
  }
})
