import React from 'react';
import { Modal } from '@forge/bridge';
import SkillGaps from '../../components/SkillGaps/SkillGaps';
import Card from '../../components/Card/Card';

const SkillGapsCard = ({ gaps }) => {
  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: (payload) => {
      console.log('onClose called with', payload);
    },
    size: 'medium',
    context: {
      modalTitle: 'Add Progress Metric',
    },
  });

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Track your Progress</h2>
          <p className="text-sm text-gray-500">Expand your skills, and fill gaps by tracking your progress.</p>
        </div>
        <button
          onClick={() => modal.open()}
          className="flex justify-end text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          + Add Topic
        </button>
      </div>
      <div>
        {/* If there is no skills gap, simply display "No Progress Metrics" */}
        {gaps.length === 0 && (
          <div className="text-center text-gray-500">
            No Progress Metrics yet.
          </div>
        )}
        {/* Render the SkillGaps component */}
        {/* Check if gaps is an array and has elements */}
        {Array.isArray(gaps) && gaps.length > 0 && (
          <div className="flex flex-col gap-4 mb-6">
            {gaps.map((gap, idx) => (
              <SkillGaps key={idx} {...gap} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SkillGapsCard;