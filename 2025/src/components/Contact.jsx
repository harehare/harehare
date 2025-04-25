import React from "react";
import { personalInfo } from "../data/data";

const Contact = () => {
  return (
    <section
      id="contact"
      className="container"
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-150px",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(113, 223, 231, 0.08) 0%, rgba(198, 93, 123, 0.05) 50%, rgba(0, 0, 0, 0) 70%)",
          borderRadius: "50%",
          zIndex: "-1",
          filter: "blur(50px)",
        }}
      ></div>

      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
          padding: "30px",
          borderRadius: "10px",
          backgroundColor: "var(--light-navy)",
          boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: "1",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
        <h2
          className="numbered-heading"
          style={{
            justifyContent: "center",
            width: "fit-content",
            margin: "0 auto 30px",
            textAlign: "center",
            fontSize: "28px",
            background:
              "linear-gradient(90deg, var(--green) 0%, var(--accent-secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Get In Touch
        </h2>
        <div>
          <p
            style={{
              fontSize: "var(--fz-lg)",
              lineHeight: "1.6",
              marginBottom: "30px",
              color: "var(--light-slate)",
            }}
          >
            Although I'm not currently looking for new opportunities, my inbox
            is always open. Whether you have a question or just want to say hi,
            I'll try my best to get back to you!
          </p>
          <div style={{ marginTop: "40px" }}>
            <a
              href={`mailto:${personalInfo.email}`}
              style={{
                display: "inline-block",
                color: "var(--lightest-slate)",
                backgroundColor: "transparent",
                border: "2px solid var(--green)",
                borderRadius: "30px",
                padding: "1rem 2rem",
                fontSize: "var(--fz-md)",
                fontWeight: "500",
                letterSpacing: "1px",
                position: "relative",
                overflow: "hidden",
                zIndex: "1",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(113, 223, 231, 0.2)",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--green)";
                e.target.style.color = "var(--navy)";
                e.target.style.boxShadow =
                  "0 7px 20px rgba(113, 223, 231, 0.4)";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "var(--lightest-slate)";
                e.target.style.boxShadow =
                  "0 5px 15px rgba(113, 223, 231, 0.2)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Say Hello
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
