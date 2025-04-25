import React, { useState, useEffect, useRef } from "react";
import { projects } from "../data/data";

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectsContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  // ウィンドウサイズを監視してモバイル状態を設定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    // 初期チェック
    checkMobile();

    // リサイズイベントリスナー
    window.addEventListener("resize", checkMobile);

    // クリーンアップ
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observerを使用して画面に表示されている要素のみレンダリング
  useEffect(() => {
    // 初期表示時には最初の6つのプロジェクト（または全部）をロード
    const initialVisibleCount = Math.min(6, projects.length);
    setVisibleProjects(projects.slice(0, initialVisibleCount));

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleProjects.length < projects.length
        ) {
          // 次の3つ（または残り全部）のプロジェクトをロード
          const nextBatch = Math.min(
            3,
            projects.length - visibleProjects.length
          );
          setVisibleProjects((prev) => [
            ...prev,
            ...projects.slice(prev.length, prev.length + nextBatch),
          ]);
        }
      },
      { threshold: 0.1 }
    );

    if (projectsContainerRef.current) {
      observer.observe(projectsContainerRef.current);
    }

    return () => {
      if (projectsContainerRef.current) {
        observer.unobserve(projectsContainerRef.current);
      }
    };
  }, [visibleProjects.length]);

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100%",
    padding: isMobile ? (isSmallMobile ? "0 15px" : "0 20px") : 0,
    margin: 0,
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    overflow: "hidden",
  };

  const headingStyle = {
    justifyContent: "flex-start",
    maxWidth: "fit-content",
    marginBottom: isMobile ? "30px" : "50px",
    fontSize: isSmallMobile
      ? "22px"
      : isMobile
      ? "clamp(24px, 5vw, 32px)"
      : "clamp(26px, 5vw, var(--fz-heading))",
    whiteSpace: isMobile ? "normal" : "nowrap",
    overflow: "hidden",
    width: "100%",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isSmallMobile
      ? "repeat(auto-fill, minmax(260px, 1fr))"
      : isMobile
      ? "repeat(auto-fill, minmax(280px, 1fr))"
      : "repeat(auto-fill, minmax(300px, 1fr))",
    gap: isSmallMobile ? "15px" : isMobile ? "20px" : "30px",
    gridAutoRows: "1fr",
    width: "100%",
    maxWidth: "1000px",
    margin: "0",
    maxHeight: isMobile ? "none" : "55vh",
    overflow: "visible",
    boxSizing: "border-box",
  };

  return (
    <section id="projects" className="container" style={sectionStyle}>
      <h2 className="numbered-heading" style={headingStyle}>
        Some Things I've Built
      </h2>
      <div style={gridStyle}>
        {visibleProjects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              height: "100%",
              display: "block",
              position: "relative",
              perspective: "1000px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--light-navy)",
                borderRadius: "10px",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                transform: "translateZ(0px)",
                transformStyle: "preserve-3d",
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseOver={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform =
                    "translateZ(20px) rotateX(5deg) rotateY(5deg)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px -20px rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.backgroundColor =
                    "var(--lightest-navy)";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateZ(0px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px -15px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.backgroundColor = "var(--light-navy)";
              }}
              onTouchStart={(e) => {
                if (isMobile) {
                  e.currentTarget.style.backgroundColor =
                    "var(--lightest-navy)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px -15px rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }
              }}
              onTouchEnd={(e) => {
                if (isMobile) {
                  e.currentTarget.style.backgroundColor = "var(--light-navy)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px -15px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "3px",
                  background: "var(--green)",
                }}
              ></div>
              <div
                style={{
                  padding: isSmallMobile
                    ? "1.2rem"
                    : isMobile
                    ? "1.5rem"
                    : "2rem",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <header>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: isMobile ? "15px" : "20px",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--green)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: isSmallMobile
                          ? "32px"
                          : isMobile
                          ? "35px"
                          : "40px",
                        height: isSmallMobile
                          ? "32px"
                          : isMobile
                          ? "35px"
                          : "40px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(113, 223, 231, 0.1)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          width: isSmallMobile
                            ? "20px"
                            : isMobile
                            ? "22px"
                            : "25px",
                          height: isSmallMobile
                            ? "20px"
                            : isMobile
                            ? "22px"
                            : "25px",
                        }}
                        loading="lazy" // SVGの遅延読み込み
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </div>
                  </div>
                  <h3
                    style={{
                      margin: "0px 0px 10px",
                      color: "var(--lightest-slate)",
                      fontSize: isSmallMobile
                        ? "18px"
                        : isMobile
                        ? "20px"
                        : "22px",
                      fontWeight: "600",
                      transition: "color 0.3s",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    style={{
                      color: "var(--light-slate)",
                      fontSize: isSmallMobile
                        ? "14px"
                        : isMobile
                        ? "15px"
                        : "16px",
                      marginBottom: "12px",
                      lineHeight: "1.5",
                      width: "100%",
                    }}
                  >
                    {project.description}
                  </div>
                </header>
                <footer style={{ marginTop: "auto" }}>
                  <ul
                    className="project-technologies"
                    style={{
                      margin: isSmallMobile
                        ? "15px 0 8px"
                        : isMobile
                        ? "20px 0 10px"
                        : "25px 0 10px",
                      display: "flex",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {project.technologies.map((tech, i) => (
                      <li
                        key={i}
                        style={{
                          display: "inline-block",
                          backgroundColor: "rgba(113, 223, 231, 0.08)",
                          color: "var(--green)",
                          borderRadius: "15px",
                          padding: isSmallMobile ? "3px 8px" : "4px 10px",
                          fontSize: isSmallMobile ? "11px" : "12px",
                          fontWeight: "500",
                          letterSpacing: "0.5px",
                          marginRight: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </footer>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 次のバッチをロードするための検出ポイント */}
      {visibleProjects.length < projects.length && (
        <div
          ref={projectsContainerRef}
          style={{ width: "100%", height: "20px", margin: "20px 0" }}
        />
      )}
    </section>
  );
};

export default Projects;
