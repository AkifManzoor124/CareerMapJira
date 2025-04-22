// src/ui/components/EmptyState/EmptyState.jsx
import React from 'react';

const EmptyState = ({ title = "No Data Available", subtitle = "Start by connecting your Jira account or creating your first issue." }) => {
  return (
    <div className="text-center py-12 text-gray-500">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
};

export default EmptyState;