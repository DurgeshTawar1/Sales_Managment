import React from 'react';
import "../styles/Loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
