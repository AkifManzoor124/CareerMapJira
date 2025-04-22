// components/Tooltip.jsx
import React, { useState } from 'react';

const Tooltip = ({ text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-block cursor-help text-gray-400"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      ⓘ
      {hovered && (
        <div className="absolute z-10 bottom-full mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg w-64">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
