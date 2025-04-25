import React, { useState, useEffect, useCallback } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

// Section definitions
const sections = [
  { id: "home", component: Hero },
  { id: "about", component: About },
  { id: "projects", component: Projects },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Initial load processing
  useEffect(() => {
    // 即時読み込みに変更し、不要な遅延を削除
    setIsLoaded(true);
  }, []);

  // スクロールハンドラをメモ化して不要な再生成を防止
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Determine scroll button visibility (show when scrolled more than 100px)
    setShowScrollButton(scrollPosition > 100);

    // Determine the active section
    let currentSection = "home";

    sections.forEach(({ id }) => {
      const sectionElement = document.getElementById(`section-${id}`);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;

        if (
          scrollPosition >= sectionTop - windowHeight / 3 &&
          scrollPosition < sectionTop + sectionHeight - windowHeight / 3
        ) {
          currentSection = id;
        }
      }
    });

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection]);

  // デバウンス関数の実装
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Scroll detection and active section setting
  useEffect(() => {
    if (!isLoaded) return;

    // スクロールイベントをデバウンス処理して最適化
    const debouncedHandleScroll = debounce(handleScroll, 20);

    // パッシブイベントリスナーを使用してパフォーマンス向上
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    // Call once to set initial state
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [isLoaded, handleScroll]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          backgroundColor: "var(--navy)",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "var(--green)",
            fontSize: "24px",
            fontFamily: "var(--font-mono)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div id="content" className="content-container">
        {sections.map(({ id, component }) => (
          <section
            key={id}
            className={`section-container ${
              id === activeSection ? "active" : ""
            }`}
            id={`section-${id}`}
            data-anchor={id}
          >
            <div className="section-inner">
              {React.createElement(component)}
            </div>
          </section>
        ))}

        {showScrollButton && (
          <button
            className="scroll-up-button"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "var(--green)",
              fontSize: "var(--fz-sm)",
              fontFamily: "var(--font-mono)",
              background: "var(--light-navy)",
              padding: "8px 12px",
              borderRadius: "4px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              opacity: 0.9,
              border: "none",
            }}
            aria-label="Scroll to top"
            title="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            <span>Back to top</span>
          </button>
        )}
      </div>
    </Layout>
  );
}

export default App;
