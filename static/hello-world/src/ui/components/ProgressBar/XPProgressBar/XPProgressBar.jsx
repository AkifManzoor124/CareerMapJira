// components/XPProgressBar.jsx
import React from 'react';

const XPProgressBar = ({ currentXP, nextXP }) => {
  const percent = Math.min((currentXP / nextXP) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default XPProgressBar;