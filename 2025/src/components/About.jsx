import React, { useEffect, useState } from "react";
import { personalInfo, skills } from "../data/data";

const About = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine grid template based on screen size
  const gridTemplateColumns = windowWidth < 768 ? "1fr" : "2fr 1fr";

  return (
    <section
      id="about"
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "2rem 1.5rem", // Adjusted padding
        margin: "0 auto",
        maxWidth: "1400px", // Increased max width to 1400px
      }}
    >
      <h2
        className="numbered-heading"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        About Me
        <style jsx>{`
          h2.numbered-heading::after {
            display: none;
          }
        `}</style>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          gap: windowWidth < 768 ? "2rem" : "4rem", // Wider responsive spacing
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "var(--fz-lg)",
              lineHeight: "1.7",
              marginBottom: "1.25rem",
              color: "var(--light-slate)",
            }}
          >
            {personalInfo.bio}
          </p>
          <p
            style={{
              fontSize: "var(--fz-lg)",
              lineHeight: "1.7",
              marginBottom: "1.25rem",
              color: "var(--light-slate)",
            }}
          >
            I focus on creating tools and applications that solve real problems
            and improve developer productivity. My projects range from
            development tools to CLI utilities that make everyday tasks easier
            and more efficient.
          </p>
          <p
            style={{
              fontSize: "var(--fz-lg)",
              marginBottom: "1rem",
              color: "var(--light-slate)",
            }}
          >
            Here are a few technologies I've been working with recently:
          </p>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "0.5rem 1rem",
              padding: 0,
              margin: "1.25rem 0 0 0",
              overflow: "hidden",
              listStyle: "none",
              maxWidth: "500px", // Set maximum width for skills list
            }}
          >
            {skills.map((skill, i) => (
              <li
                key={i}
                style={{
                  position: "relative",
                  marginBottom: "0.75rem",
                  paddingLeft: "1.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fz-sm)",
                  color: "var(--slate)",
                }}
              >
                <div
                  style={{
                    color: "var(--green)",
                    position: "absolute",
                    left: "0",
                    top: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            position: "relative",
            maxWidth: windowWidth < 768 ? "250px" : "300px",
            margin: windowWidth < 768 ? "0 auto" : "2rem auto 0", // Adjusted margin for smaller screens
            alignSelf: "center", // Vertically centered
          }}
        >
          <div
            style={{
              boxShadow: "0 10px 30px -15px var(--navy-shadow)",
              transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
              position: "relative",
              zIndex: 1,
              borderRadius: "10px",
              backgroundColor: "var(--green)",
              backgroundSize: "cover",
              width: "100%",
              maxWidth: "300px",
              aspectRatio: "1 / 1", // Maintain 1:1 aspect ratio
              filter: "grayscale(100%) contrast(1) brightness(90%)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px -15px rgba(0, 0, 0, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter =
                "grayscale(100%) contrast(1) brightness(90%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px -15px var(--navy-shadow)";
            }}
          >
            {/* Profile image would go here */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                top: 0,
                left: 0,
                background:
                  "linear-gradient(0deg, rgba(22, 33, 62, 0.5), rgba(22, 33, 62, 0))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
