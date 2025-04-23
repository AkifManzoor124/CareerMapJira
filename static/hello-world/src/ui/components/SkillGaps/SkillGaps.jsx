import React from 'react';
import { Modal, invoke } from '@forge/bridge';
import ProgressBar from '../ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const SkillGaps = ({id, name, completed, remaining, setMetrics}) => {
  
  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: async (payload) => {
      // if payload undefined or empty, do nothing 
      if (!payload || Object.keys(payload).length === 0) return;
      // if delete is true, remove the goal from userGoals
      if (payload.delete) {
          console.log('deleting the metric');
          console.log("payload", payload);
          setMetrics((prev) => prev.filter((goal) => goal.id !== payload.id));
          return;
      }

      const updatedMetric = await invoke('update-metric', payload);

      //find the metric being editted, and update it with the new payload
      setMetrics((prev) => {
        const updated = prev.map((metric) => 
        metric.id === payload.id ? {...metric, ...payload} : metric);
        return updated;
      });
      
    },
    size: 'medium',
    context: {
      modalType: 'add-metric',
      modalTitle: 'Edit Your Progress',
      id: id,
      name: name,
      completed: completed,
      remaining: remaining,
      deleteButton: true,
    },
  });

  const percentage = (completed / remaining) * 100;

  // const isFirst = index === 0;
  const isFirst = false; // Placeholder, replace with actual logic if needed
  // const isLast = index === gaps.length - 1;
  const isLast = false; // Placeholder, replace with actual logic if needed

  const itemClasses = `
    w-full flex items-center justify-start gap-6 py-2
    ${!isLast ? 'border-b' : ''}
    ${isFirst ? 'rounded-t' : ''}
    ${isLast ? 'rounded-b' : ''}
    bg-white border border-gray-400 rounded shadow-sm
  `;

  return (
    <div className={itemClasses}>

      <div className="w-1/5 flex flex-row justify-between pr-2">
        <div className="w-1/5 font-medium text-gray-800 pl-2">{name}</div>
        <button className="flex justify-end items-center ml-2" onClick={() => modal.open()}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-gray-500"
            style={{ width: '0.75rem', height: '0.75rem' }}
          />
        </button>
      </div>

      <ProgressBar progress={Number(percentage)} max={100} className="w-1/5" />

      <div className="w-1/5 items-center justify-end text-center text-xs text-gray-700 bg-gray-200 px-2 py-1 ml-2 rounded">
          <span className="font-medium">{completed}</span> tickets
      </div>

      <div className="w-1/3 pl-4 pr-2 text-left text-sm font-semibold text-red-500">
        {remaining} ticket{remaining !== 1 ? 's' : ''} left
      </div>
    </div>
  );
};

export default SkillGaps;