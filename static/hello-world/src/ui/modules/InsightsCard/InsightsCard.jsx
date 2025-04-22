// src/ui/modules/InsightsCard/InsightsCard.jsx
import React from 'react';
import Card from '../../components/Card';

const InsightsCard = ({ insights }) => {
  return (
    <Card title="Career Insights">
      <ul className="list-disc list-inside text-sm text-gray-700">
        {insights.map((insight, idx) => <li key={idx}>{insight}</li>)}
      </ul>
    </Card>
  );
};

export default InsightsCard;