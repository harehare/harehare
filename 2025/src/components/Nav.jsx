import React, { useState, useEffect } from "react";
import { personalInfo } from "../data/data";

const Nav = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 基本のナビゲーションスタイル
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: "100%",
    color: "var(--lightest-slate)",
    fontFamily: "var(--font-mono)",
    counter: "none",
    zIndex: "12",
  };

  // リンク全体のコンテナスタイル - モバイル対応
  const linksStyle = {
    display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
    alignItems: "center",
    flexDirection: isMobile ? "column" : "row",
    position: isMobile ? "absolute" : "relative",
    top: isMobile ? "100%" : "auto",
    right: isMobile ? "0" : "auto",
    padding: isMobile ? "20px" : "0",
    backgroundColor: isMobile ? "var(--light-navy)" : "transparent",
    borderRadius: isMobile ? "0 0 10px 10px" : "0",
    width: isMobile ? "100%" : "auto",
    boxShadow: isMobile ? "0 10px 30px -15px rgba(0, 0, 0, 0.3)" : "none",
  };

  // リストスタイル - モバイル対応
  const listStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0",
    margin: "0",
    listStyle: "none",
    flexDirection: isMobile ? "column" : "row",
    width: isMobile ? "100%" : "auto",
  };

  const listItemStyle = {
    margin: isMobile ? "10px 0" : "0 5px",
    position: "relative",
  };

  const linkStyle = {
    padding: "10px 15px",
    color: "var(--lightest-slate)",
    textDecoration: "none",
    transition: "var(--transition)",
    display: "inline-block",
    position: "relative",
    fontWeight: "500",
    letterSpacing: "1px",
  };

  // モバイルメニューボタン
  const mobileButtonStyle = {
    display: isMobile ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: "10",
    margin: "0",
    padding: "15px",
    border: "none",
    background: "transparent",
    color: "inherit",
    textTransform: "none",
    transition: "var(--transition)",
    cursor: "pointer",
  };

  return (
    <nav style={navStyle}>
      <div style={linksStyle}>
        <ol style={listStyle}>
          {navLinks.map(({ name, url }, i) => (
            <li key={i} style={listItemStyle}>
              <a
                href={url}
                style={linkStyle}
                onMouseOver={(e) => {
                  e.target.style.color = "var(--green)";
                  const after = document.createElement("style");
                  after.innerHTML = `
                    ${e.target.tagName.toLowerCase()}[href="${url}"]::after {
                      content: '';
                      position: absolute;
                      width: 70%;
                      height: 2px;
                      bottom: 5px;
                      left: 15%;
                      background: linear-gradient(90deg, var(--green) 0%, var(--accent-secondary) 100%);
                      transition: var(--transition);
                    }
                  `;
                  document.head.appendChild(after);
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "var(--lightest-slate)";
                  const styles = document.querySelectorAll(`style`);
                  styles.forEach((style) => {
                    if (style.innerHTML.includes(`[href="${url}"]::after`)) {
                      document.head.removeChild(style);
                    }
                  });
                }}
              >
                {name}
              </a>
            </li>
          ))}
        </ol>

        <div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
            style={{
              color: "var(--green)",
              borderRadius: "30px",
              border: "2px solid var(--green)",
              padding: "0.75rem 1.5rem",
              fontWeight: "500",
              letterSpacing: "1px",
              boxShadow: "0 3px 10px rgba(113, 223, 231, 0.2)",
              transition: "all 0.3s ease",
              textDecoration: "none",
              marginTop: isMobile ? "20px" : "0",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "var(--green)";
              e.target.style.color = "var(--navy)";
              e.target.style.boxShadow = "0 5px 15px rgba(113, 223, 231, 0.4)";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "var(--green)";
              e.target.style.boxShadow = "0 3px 10px rgba(113, 223, 231, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            GitHub
          </a>
        </div>
      </div>

      <button
        style={mobileButtonStyle}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
    </nav>
  );
};

export default Nav;
