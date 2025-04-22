// components/SkillDiversityCard.jsx
import React from 'react';
import Card from '../Card';

export const SkillDiversityCard = ({ skills }) => (
  <Card>
    <div className="text-sm text-gray-500">Breadth of Skills</div>
    <div className="text-2xl font-semibold text-gray-800">{skills.length} Areas</div>
    <div className="mt-1 text-xs text-gray-400 truncate">{skills.join(', ')}</div>
  </Card>
);

export default SkillDiversityCard;