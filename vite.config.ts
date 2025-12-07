import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/',   // ★ 중요: 커스텀 도메인은 항상 root
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
