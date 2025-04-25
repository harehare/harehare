import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/styles.css";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  // ウィンドウサイズを監視してモバイル状態を設定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 初期チェック
    checkMobile();

    // リサイズイベントリスナー
    window.addEventListener("resize", checkMobile);

    // クリーンアップ
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="layout"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // 水平方向のスクロールを防止
        backgroundColor: "var(--navy)",
        width: "100%",
        maxWidth: "100vw", // 最大幅を制限
        position: "relative",
      }}
    >
      <Header />
      <main
        style={{
          position: "relative",
          width: "100%",
          flex: "1 1 auto",
          overflow: "auto",
          overflowX: "hidden", // 水平方向のスクロールを明示的に防止
          zIndex: 1,
          paddingTop: isMobile ? "var(--nav-height)" : "0",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
