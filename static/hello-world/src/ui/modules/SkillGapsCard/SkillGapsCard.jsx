import React from 'react';
import { Modal, invoke } from '@forge/bridge';
import SkillGaps from '../../components/SkillGaps/SkillGaps';
import Card from '../../components/Card/Card';
import { useOnboarding } from '../OnboardingProvider/OnboardingProvider';

const SkillGapsCard = ({ metrics, setMetrics }) => {
  const { pauseOnboarding, completeStepManually } = useOnboarding();

  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: async (payload) => {
      // if payload undefined or empty object, do nothing
      if (!payload || Object.keys(payload).length === 0) return;
      
      //add metric
      payload.id = Date.now().toString();
      const newMetric = await invoke('add-metric', payload);
      setMetrics((prev) => [...prev, payload]);
      completeStepManually(1);
    },
    size: 'medium',
    context: {
      modalType: 'add-metric',
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
          data-tour="add-metric"
          onClick={() => {modal.open(); pauseOnboarding()}}
          className="flex justify-end text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 cursor-pointer"
        >
          + Add Topic
        </button>
      </div>
      <div>
        {/* If there is no skills gap, simply display "No Progress Metrics" */}
        {metrics.length === 0 && (
          <div className="text-sm text-gray-400">
            No progress metrics yet. <br />
          </div>
        )}
        {/* Render the SkillGaps component */}
        {/* Check if gaps is an array and has elements */}
        {Array.isArray(metrics) && metrics.length > 0 && (
          <div className="flex flex-col gap-4 mb-6">
            {metrics.map((metric, idx) => (
              <SkillGaps key={idx} {...metric} setMetrics={setMetrics} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SkillGapsCard;