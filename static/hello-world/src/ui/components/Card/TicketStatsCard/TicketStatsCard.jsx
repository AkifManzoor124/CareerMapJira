// components/TicketStatsCard.jsx
import React from 'react';
import Card from '../../Card/Card';

export const TicketStatsCard = ({ title, value, subtext }) => (
  <Card>
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-semibold text-gray-800">{value}</div>
    {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
  </Card>
);

export default TicketStatsCard;