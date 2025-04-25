import React from "react";
import { experience } from "../data/data";

const Experience = () => {
  return (
    <section id="experience" className="container">
      <h2 className="numbered-heading">Where I've Worked</h2>
      <div>
        {experience.map((job, index) => (
          <div
            key={index}
            style={{
              marginBottom: "40px",
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "var(--light-navy)",
              transition: "var(--transition)",
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px -20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px -15px rgba(0, 0, 0, 0.2)";
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                width: "4px",
                height: "100%",
                background:
                  "linear-gradient(180deg, var(--green) 0%, var(--accent-secondary) 100%)",
              }}
            ></div>
            <div style={{ marginBottom: "15px" }}>
              <h3 style={{ margin: "0px 0px 5px", fontSize: "24px" }}>
                {job.position}{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, var(--green) 0%, var(--accent-secondary) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  @ {job.company}
                </span>
              </h3>
              <p
                className="highlight"
                style={{
                  margin: "0px 0px 15px",
                  fontWeight: "500",
                  letterSpacing: "1px",
                }}
              >
                {job.period}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "var(--fz-lg)",
                  lineHeight: "1.6",
                  marginBottom: "15px",
                }}
              >
                {job.description}
              </p>
              <ul
                className="project-technologies"
                style={{ margin: "20px 0px 0px" }}
              >
                {job.technologies.map((tech, i) => (
                  <li
                    key={i}
                    style={{
                      display: "inline-block",
                      backgroundColor: "rgba(113, 223, 231, 0.08)",
                      color: "var(--green)",
                      borderRadius: "15px",
                      padding: "4px 12px",
                      fontSize: "13px",
                      fontWeight: "500",
                      letterSpacing: "0.5px",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
