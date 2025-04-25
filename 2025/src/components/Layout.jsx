import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/styles.css";

const Layout = ({ children }) => {
  return (
    <div
      className="layout"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        backgroundColor: "var(--navy)",
      }}
    >
      <Header />
      <main
        style={{
          position: "relative",
          width: "100%",
          flex: "1 1 auto",
          overflow: "visible",
          zIndex: 1,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
