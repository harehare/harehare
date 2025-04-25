import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { navLinks } from "../data/data";

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState("none");
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    const threshold = 50;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      setScrolledToTop(scrollY < 50);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerStyle = {
    height: "var(--nav-height)",
    background: "var(--navy)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    padding: "0px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999, // 非常に高いz-indexを設定
    transition: "var(--transition)",
    filter: "none",
    pointerEvents: "auto",
    userSelect: "auto",
    transform:
      scrollDirection === "down" && !scrolledToTop
        ? "translateY(-100%)"
        : "translateY(0px)",
    boxShadow: !scrolledToTop ? "0 10px 30px -10px rgba(0, 0, 0, 0.3)" : "none",
    backdropFilter: !scrolledToTop ? "blur(10px)" : "none",
    backgroundColor: !scrolledToTop ? "rgba(22, 33, 62, 0.85)" : "var(--navy)",
    // フルページスクロールに対応する追加スタイル
    WebkitTransform:
      scrollDirection === "down" && !scrolledToTop
        ? "translateY(-100%)"
        : "translateY(0px)",
    MozTransform:
      scrollDirection === "down" && !scrolledToTop
        ? "translateY(-100%)"
        : "translateY(0px)",
  };

  const logoStyle = {
    color: "var(--green)",
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "var(--font-mono)",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  };

  return (
    <header style={headerStyle}>
      <a href="#section-home" style={logoStyle}>
        <span style={{ color: "var(--green)" }}>T.S</span>
      </a>
      <Nav navLinks={navLinks} />
    </header>
  );
};

export default Header;
