import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pagesへのデプロイのための設定
// リポジトリ名がURLのパスとなるため、その対応
export default defineConfig({
  plugins: [react()],
  base: "/agent_portfolio/", // GitHubリポジトリ名に合わせて変更

  // ビルド最適化の設定
  build: {
    // チャンクサイズの最適化
    chunkSizeWarningLimit: 600,
    // CSS分割の最適化
    cssCodeSplit: true,
    // アセットインライン化のサイズ制限
    assetsInlineLimit: 4096,
    // ソースマップの生成を本番環境で無効化
    sourcemap: false,
    // ビルドの最適化オプション
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
    // 圧縮設定
    minify: "terser",
    terserOptions: {
      compress: {
        // 本番環境のデッドコード削除
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // 開発サーバーの設定
  server: {
    open: true,
    // アセットの事前読み込みを有効化
    hmr: {
      overlay: true,
    },
    // 静的ファイルの圧縮
    cors: true,
  },
});
