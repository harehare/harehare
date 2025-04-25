import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-technologies"></div>

        <div className="project-links"></div>
      </div>
    </div>
  );
};

export default ProjectCard;
