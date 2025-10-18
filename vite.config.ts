import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base : process.env.GITHUB_ACTIONS ? '/Profile/' : '/',
    plugins: [react()],
    server: {
        proxy: {
            '/solved': {
                target: 'https://solved.ac',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/solved/, '')
            }
        }
    }
})
