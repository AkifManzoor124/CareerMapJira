// components/EpicContributionCard.jsx
import React from 'react';
import Card from '../Card';

export const EpicContributionCard = ({ epicsTouched }) => (
  <Card>
    <div className="text-sm text-gray-500">Epic Contribution</div>
    <div className="text-2xl font-semibold text-gray-800">{epicsTouched} Epics</div>
  </Card>
);

export default EpicContributionCard;