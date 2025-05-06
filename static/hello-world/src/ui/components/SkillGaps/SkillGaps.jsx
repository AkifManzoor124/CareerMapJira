import React from 'react';
import { Modal, invoke } from '@forge/bridge';
import ProgressBar from '../ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card/Card';
import { useOnboarding } from '../../modules/OnboardingProvider/OnboardingProvider';

const SkillGaps = ({ id, name, completed, remaining, setMetrics }) => {
  const { pauseOnboarding, completeStepManually } = useOnboarding();

  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: async (payload) => {
      if (!payload || Object.keys(payload).length === 0) return;

      if (payload.delete) {
        setMetrics((prev) => prev.filter((metric) => metric.id !== payload.id));
        await invoke('delete-metric', payload);
        return;
      }

      console.log('payload', payload);

      const updatedMetric = await invoke('update-metric', payload);
      setMetrics((prev) =>
        prev.map((metric) => (metric.id === payload.id ? { ...metric, ...payload } : metric))
      );
      completeStepManually(2);
    },
    size: 'medium',
    context: {
      modalType: 'add-metric',
      modalTitle: 'Edit Your Progress',
      id,
      name,
      completed,
      remaining,
      deleteButton: true,
    },
  });

  const percentage = (completed / remaining) * 100;

  return (
    <Card>
      <div className='flex flex-row items-center justify-center'>
      {/* Title + Edit */}
      <div className="flex flex-row mr-2">
          <span style={{width: "max-content"}} className="text-sm font-medium text-gray-800">{name}</span>
          <button data-tour="edit-metric" className="ml-2 cursor-pointer" onClick={() => {modal.open(); pauseOnboarding();}}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-gray-500"
              style={{ width: '0.75rem', height: '0.75rem' }}
            />
          </button>
      </div>

        {/* ProgressBar */}
        <div className="flex flex-row mr-2 w-1/2">
          <ProgressBar progress={Number(percentage)} max={100} />
        </div>

        {/* Completed */}
        <div className="flex items-center justify-center text-xs text-gray-700 bg-gray-200 rounded h-2 w-1/6 p-2">
          <span>{completed}</span>&nbsp;tickets
        </div>

        {/* Remaining */}
        <div className="flex items-center justify-center text-sm font-semibold text-red-500 text-center w-1/4">
          {remaining} ticket{remaining !== 1 ? 's' : ''} left
        </div>

      </div>
    </Card>
  );
};

export default SkillGaps;
