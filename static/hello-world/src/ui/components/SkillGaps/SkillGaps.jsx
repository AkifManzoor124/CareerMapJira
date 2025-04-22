import React from 'react';
import { Modal } from '@forge/bridge';
import ProgressBar from '../ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const SkillGaps = ({name, completed, required}) => {
  
  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: (payload) => {
      console.log('onClose called with', payload);
    },
    size: 'medium',
    context: {
      modalTitle: 'Edit Your Progress',
      name: name,
      // description: description,
      // targetDate: targetDate,
      // progress: progress,
      deleteButton: true,
    },
  });

  const percentage = (completed / required) * 100;
  const ticketsRemaining = Math.max(required - completed, 0);

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

      <ProgressBar value={percentage} max={100} className="w-1/5" />

      <div className="w-1/5 items-center justify-end text-center text-xs text-gray-700 bg-gray-200 px-2 py-1 ml-2 rounded">
          <span className="font-medium">{completed}</span> tickets
      </div>

      <div className="w-1/3 pl-4 pr-2 text-left text-sm font-semibold text-red-500">
        {ticketsRemaining} ticket{ticketsRemaining !== 1 ? 's' : ''} left
      </div>
    </div>
  );
};

export default SkillGaps;