import React, { useState, useEffect, useRef } from "react";
import { projects } from "../data/data";

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectsContainerRef = useRef(null);

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

  return (
    <section
      id="projects"
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100%",
        padding: 0,
        margin: 0,
        position: "relative",
      }}
    >
      <h2
        className="numbered-heading"
        style={{
          justifyContent: "flex-start",
          maxWidth: "fit-content",
          marginBottom: "50px",
        }}
      >
        Some Things I've Built
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
          gridAutoRows: "1fr",
          width: "100%",
          maxWidth: "1000px",
          margin: "0",
          maxHeight: "55vh",
          overflow: "visible",
        }}
      >
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
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform =
                  "translateZ(20px) rotateX(5deg) rotateY(5deg)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px -20px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.backgroundColor = "var(--lightest-navy)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateZ(0px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px -15px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.backgroundColor = "var(--light-navy)";
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
              <div style={{ padding: "2rem" }}>
                <header>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--green)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
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
                        style={{ width: "25px", height: "25px" }}
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
                      fontSize: "22px",
                      fontWeight: "600",
                      transition: "color 0.3s",
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    style={{
                      color: "var(--light-slate)",
                      fontSize: "16px",
                      marginBottom: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    {project.description}
                  </div>
                </header>
                <footer style={{ marginTop: "auto" }}>
                  <ul
                    className="project-technologies"
                    style={{ margin: "25px 0 10px" }}
                  >
                    {project.technologies.map((tech, i) => (
                      <li
                        key={i}
                        style={{
                          display: "inline-block",
                          backgroundColor: "rgba(113, 223, 231, 0.08)",
                          color: "var(--green)",
                          borderRadius: "15px",
                          padding: "4px 10px",
                          fontSize: "12px",
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
