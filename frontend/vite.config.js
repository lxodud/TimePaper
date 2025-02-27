import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3000 // 또는 다른 사용 가능한 포트 번호
  // }
});
