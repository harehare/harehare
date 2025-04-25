import React, { useState, useEffect } from "react";
import { personalInfo } from "../data/data";

const Nav = ({ navLinks, isMobile: propIsMobile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Use the prop value if provided, otherwise detect from window size
  const [isMobile, setIsMobile] = useState(
    propIsMobile !== undefined ? propIsMobile : false
  );

  // ウィンドウサイズを監視してモバイル状態を設定
  useEffect(() => {
    // If prop is provided, use that value
    if (propIsMobile !== undefined) {
      setIsMobile(propIsMobile);
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 初期チェック
    checkMobile();

    // リサイズイベントリスナー
    window.addEventListener("resize", checkMobile);

    // クリーンアップ
    return () => window.removeEventListener("resize", checkMobile);
  }, [propIsMobile]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // モバイルメニューが開いているときはスクロールを無効に
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  // 基本のナビゲーションスタイル
  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
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
    position: isMobile ? "fixed" : "relative",
    top: isMobile ? "0" : "auto",
    right: isMobile ? "0" : "auto",
    bottom: isMobile ? "0" : "auto",
    left: isMobile ? "0" : "auto",
    padding: isMobile ? "100px 20px 40px" : "0",
    backgroundColor: isMobile ? "var(--light-navy)" : "transparent",
    width: isMobile ? "100%" : "auto",
    height: isMobile ? "100vh" : "auto",
    boxShadow: isMobile ? "0 10px 30px -15px rgba(0, 0, 0, 0.3)" : "none",
    transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
    justifyContent: isMobile ? "center" : "flex-end",
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
    margin: isMobile ? "20px 0" : "0 5px",
    position: "relative",
    fontSize: isMobile ? "var(--fz-lg)" : "var(--fz-sm)",
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
    zIndex: "13",
    margin: "0",
    padding: "10px",
    border: "none",
    background: "transparent",
    color: menuOpen ? "var(--green)" : "var(--lightest-slate)",
    textTransform: "none",
    transition: "var(--transition)",
    cursor: "pointer",
    fontSize: "var(--fz-md)",
    fontFamily: "var(--font-mono)",
    fontWeight: "600",
  };

  // ハンバーガーメニューのスタイル
  const hamburgerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "24px",
    height: "24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
    zIndex: "13",
  };

  const hamburgerLineStyle = (index) => ({
    width: "100%",
    height: "2px",
    backgroundColor: menuOpen ? "var(--green)" : "var(--lightest-slate)",
    transition: "all 0.3s ease",
    position: "relative",
    transform:
      menuOpen && index === 0
        ? "rotate(45deg) translate(5px, 5px)"
        : menuOpen && index === 2
        ? "rotate(-45deg) translate(5px, -5px)"
        : "none",
    opacity: menuOpen && index === 1 ? 0 : 1,
  });

  // モバイルメニューのオーバーレイスタイル
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(22, 33, 62, 0.95)",
    zIndex: 11,
    display: isMobile && menuOpen ? "block" : "none",
    backdropFilter: "blur(5px)",
  };

  return (
    <nav style={navStyle}>
      {/* Overlay for mobile menu */}
      <div style={overlayStyle} onClick={toggleMenu} />

      <div style={linksStyle}>
        <ol style={listStyle}>
          {navLinks.map(({ name, url }, i) => (
            <li key={i} style={listItemStyle}>
              <a
                href={url}
                style={linkStyle}
                onClick={() => isMobile && toggleMenu()}
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
              padding: isMobile ? "0.6rem 1.2rem" : "0.75rem 1.5rem",
              fontWeight: "500",
              letterSpacing: "1px",
              boxShadow: "0 3px 10px rgba(113, 223, 231, 0.2)",
              transition: "all 0.3s ease",
              textDecoration: "none",
              marginTop: isMobile ? "30px" : "0",
              marginLeft: isMobile ? "0" : "15px",
              fontSize: isMobile ? "var(--fz-md)" : "var(--fz-sm)",
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
        <div style={hamburgerStyle}>
          <span style={hamburgerLineStyle(0)}></span>
          <span style={hamburgerLineStyle(1)}></span>
          <span style={hamburgerLineStyle(2)}></span>
        </div>
      </button>
    </nav>
  );
};

export default Nav;
