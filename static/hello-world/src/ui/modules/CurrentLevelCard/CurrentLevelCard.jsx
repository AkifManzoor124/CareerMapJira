// components/CurrentLevelCard.jsx
import React, { useEffect, useState } from 'react';
import XPProgressBar from '../../components/ProgressBar/XPProgressBar/XPProgressBar';
import Card from '../../components/Card/Card';
import NextMilestone from '../../components/NextMilestone/NextMilestone';

const CurrentLevelCard = () => {
  const [level, setLevel] = useState('');
  const [currentXP, setCurrentXP] = useState(0);
  const [nextXP, setNextXP] = useState(0);
  const [nextMilestone, setNextMilestone] = useState('');

  useEffect(() => {
    // Example: Fetch from GraphQL API (placeholder)
    const fetchData = async () => {
      // Simulated fetch - replace with real GraphQL call
      const data = await Promise.resolve({
        level: 'Intermediate Backend Developer',
        currentXP: 1480,
        nextXP: 2000,
        nextMilestone: 'Project Architect',
      });

      setLevel(data.level);
      setCurrentXP(data.currentXP);
      setNextXP(data.nextXP);
      setNextMilestone(data.nextMilestone);
    };

    fetchData();
  }, []);

  return (
    <Card title="Current Level">
      <div className="flex items-center justify-between mb-1">
        <div className="text-blue-600 text-xl">{level}</div>
      </div>
      {/* <XPProgressBar currentXP={currentXP} nextXP={nextXP} /> */}
      {/* <div className="text-sm text-gray-600 mt-1">
        {currentXP} / {nextXP} XP
      </div> */}
      {/* <NextMilestone milestone={nextMilestone} /> */}
    </Card>
  );
};

export default CurrentLevelCard;