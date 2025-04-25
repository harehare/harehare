// IMPORTANT: This file is currently not being used in the application.
// The active projects component is src/components/Projects.jsx
// This file can be safely removed or repurposed if needed.
import React, { useState, useEffect } from "react";
import { fetchRepositoryData } from "../services/githubService";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = []; // Fetch or define your projects data here

      const updatedProjects = await Promise.all(
        projectsData.map(async (project) => {
          if (project.repo && project.owner) {
            const repoData = await fetchRepositoryData(
              project.owner,
              project.repo
            );
            if (repoData) {
              return {
                ...project,
                stars: repoData.stars,
              };
            }
          }
          return project;
        })
      );

      setProjects(updatedProjects);
    };

    loadProjects();
  }, []);

  return <div>{/* Render your projects here */}</div>;
};

export default Projects;
