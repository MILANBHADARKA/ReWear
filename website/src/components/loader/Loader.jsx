'use client';

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Loader.css';

const Loader = ({ size = 'medium', message = 'Loading...', variant = 'default', fullScreen = true }) => {
  const { theme } = useTheme();
  
  const getLoaderClass = () => {
    return `rewear-loader rewear-loader--${size} rewear-loader--${variant} rewear-loader--${theme}`;
  };

  const containerClass = fullScreen 
    ? `rewear-loader-container rewear-loader-container--${theme} rewear-loader-container--fullscreen`
    : `rewear-loader-container rewear-loader-container--${theme}`;

  return (
    <div className={containerClass}>
      <div className={getLoaderClass()}>
        {/* Clothing hanger animation */}
        <div className="loader-hanger">
          <div className="hanger-hook"></div>
          <div className="hanger-bar"></div>
          <div className="hanger-shoulders">
            <div className="shoulder left"></div>
            <div className="shoulder right"></div>
          </div>
        </div>
        
        {/* Rotating clothing items */}
        <div className="loader-clothes">
          <div className="cloth-item shirt">👕</div>
          <div className="cloth-item pants">👖</div>
          <div className="cloth-item dress">👗</div>
          <div className="cloth-item jacket">🧥</div>
        </div>

        {/* Spinning circles for points/exchange */}
        <div className="loader-points">
          <div className="point"></div>
          <div className="point"></div>
          <div className="point"></div>
        </div>
      </div>
      
      {/* {message && (
        <div className={`loader-message loader-message--${theme}`}>
          <span>{message}</span>
          <div className="message-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

// Different loader variants for different contexts - all full screen by default
export const ClothingUploadLoader = () => (
  <Loader 
    message="Processing your clothing item..." 
    variant="upload"
    size="large"
    fullScreen={true}
  />
);

export const AIAnalysisLoader = () => (
  <Loader 
    message="AI is analyzing clothing condition..." 
    variant="ai"
    size="medium"
    fullScreen={true}
  />
);

export const ChatbotLoader = () => (
  <Loader 
    message="Finding perfect matches..." 
    variant="chatbot"
    size="small"
    fullScreen={true}
  />
);

export default Loader;
