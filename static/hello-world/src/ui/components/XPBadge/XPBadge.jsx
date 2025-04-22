// src/ui/components/XPBadge/XPBadge.jsx
import React from 'react';

const XPBadge = ({ xp }) => {
  return (
    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
      {xp} XP
    </span>
  );
};

export default XPBadge;
