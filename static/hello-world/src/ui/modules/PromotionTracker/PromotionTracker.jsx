import React from 'react';
import { Card } from '../../components/Card/Card';
// import { ProgressBar } from '../../components/ProgressBar';
// PromotionTracker Component

export const PromotionTracker = ({ currentLevel, nextLevel, progress }) => (
  <Card title="Promotion Tracker">
    <p className="mb-2">Next Level: {nextLevel}</p>
    <div className="flex items-center justify-center text-center">
    {/* <ProgressBar value={0.3} /> <span className="pl-2">{progress}/100</span> */}
    </div>
  </Card>
);

export default PromotionTracker;