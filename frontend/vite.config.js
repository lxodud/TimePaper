import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  // 환경 변수를 모드에 따라 동적으로 로드
  const env = loadEnv(mode, process.cwd());

  const apiUrl = env.VITE_API_URL;
  const proxyPath = env.VITE_PROXY_PATH;

  return {
    plugins: [
      react(),
      compression({
        algorithm: "gzip", // Gzip 알고리즘 사용
        ext: ".gz", // 생성되는 파일의 확장자
        threshold: 10240, // 압축 최소 크기 (10KB 이상만 압축)
      }),
    ],
    server: {
      proxy: {
        [proxyPath]: {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${proxyPath}`), ""),
          secure: false,
          ws: true,
        },
      },
    },
  };
});
