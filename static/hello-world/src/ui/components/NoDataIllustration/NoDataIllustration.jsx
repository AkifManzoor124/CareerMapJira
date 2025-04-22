// src/ui/components/NoDataIllustration/NoDataIllustration.jsx
import React from 'react';

const NoDataIllustration = () => {
  return (
    <div className="text-center text-gray-400 py-16">
      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4m0 0l-4-4m4 4l-4 4" />
      </svg>
      <p>No data to display yet</p>
    </div>
  );
};

export default NoDataIllustration;