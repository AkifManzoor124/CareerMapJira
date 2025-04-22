// components/NextMilestone.jsx
import React from 'react';
import Tooltip from '../Tooltip/Tooltip';

const NextMilestone = ({ milestone }) => {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-sm text-gray-500">Next Unlock</div>
      <div className="flex flex-row gap-2">
        <div className="font-semibold text-gray-700 mt-1">{milestone}</div>
        <Tooltip text="Levels are metaphorical representations of your progress — not job titles." />
      </div>
    </div>
  );
};

export default NextMilestone;