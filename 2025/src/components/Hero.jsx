import React from "react";
import { personalInfo } from "../data/data";
import "../styles/components/Hero.css";

const Hero = () => {
  const scrollToSection = (section) => {
    const element = document.getElementById(`section-${section}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container hero-container">
      <div className="hero-content">
        <div className="hello-wrapper">
          <div className="hello-background"></div>
          <p className="highlight hello-text">Hi, I'm Takahiro</p>
        </div>

        <h1 className="big-heading hero-heading-primary">
          Building web & developer tools.
        </h1>

        <h2 className="big-heading hero-heading-secondary">
          Software Engineer
        </h2>

        <div className="hero-description">
          <p>
            I'm a {personalInfo.title} based in {personalInfo.location}. I
            specialize in web development and developer tools, creating clean
            solutions that enhance productivity and solve real problems.
          </p>
        </div>

        <div className="hero-cta">
          <button
            onClick={() => scrollToSection("about")}
            className="hero-button"
          >
            View my work
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
