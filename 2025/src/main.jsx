import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// GitHub Pages用のリダイレクト処理
// URLパラメータからリダイレクト先を取得して処理する
function handleRedirect() {
  const query = new URLSearchParams(window.location.search);
  const redirectPath = query.get("redirect");

  if (redirectPath) {
    // URLパラメータをクリーンアップ
    const cleanUrl = window.location.pathname;
    window.history.replaceState(null, null, cleanUrl);

    // アンカータグに対する処理（#で始まるセクションへのスクロール）
    if (redirectPath.startsWith("#")) {
      const element = document.getElementById(redirectPath.substring(1));
      if (element) {
        element.scrollIntoView();
      }
    }
  }
}

// ページロード時にリダイレクト処理を実行
handleRedirect();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
