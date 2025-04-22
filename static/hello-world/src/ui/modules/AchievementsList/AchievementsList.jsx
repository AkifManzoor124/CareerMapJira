// src/ui/modules/AchievementsList/AchievementsList.jsx
import React from 'react';
import { Card } from '../../components/Card/Card';
import { Achievements } from '../../components/Achievements/Achievements';
// AchievementsList Component

const AchievementsList = ({ achievements }) => {
  return (
    <Card title="Achievements">
      <Achievements achievements={achievements} />
    </Card>
  );
};

export default AchievementsList;
