// components/ConceptPieChartCard.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

export const ConceptPieChartCard = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#F472B6'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full max-w-xs">
      <div className="text-sm text-gray-500 mb-2">Concepts Touched</div>
      <Pie data={chartData} />
    </div>
  );
};

export default ConceptPieChartCard;