import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { navLinks } from "../data/data";

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState("none");
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Dynamically adjust padding based on screen size
  const getPadding = () => {
    if (window.innerWidth <= 480) {
      return "0px 20px";
    } else if (window.innerWidth <= 768) {
      return "0px 30px";
    } else {
      return "0px 50px";
    }
  };

  const headerStyle = {
    height: "var(--nav-height)",
    background: "var(--navy)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    padding: getPadding(),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
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
    fontSize: isMobile ? "1.2rem" : "1.5rem",
    fontWeight: "bold",
    fontFamily: "var(--font-mono)",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: isMobile ? "0 5px" : "0",
    marginRight: "auto",
  };

  return (
    <header style={headerStyle}>
      <a href="#section-home" style={logoStyle}>
        <span style={{ color: "var(--green)" }}>T.S</span>
      </a>
      <Nav navLinks={navLinks} isMobile={isMobile} />
    </header>
  );
};

export default Header;
