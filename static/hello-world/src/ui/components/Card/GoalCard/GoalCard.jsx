// components/GoalCard.jsx
import React, { useState}  from 'react';
import { Modal } from '@forge/bridge';
import Card from '../Card';
import ProgressBar from '../../ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export const GoalCard = ({ title, description, targetDate, progress }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: (payload) => {
      console.log('onClose called with', payload);
    },
    size: 'medium',
    context: {
      modalTitle: 'Edit Your Goal',
      name: title,
      description: description,
      targetDate: targetDate,
      progress: progress,
      deleteButton: true,
    },
  });

  const handleAddGoal = () => {
    modal.open()
  };

  return(
    <Card>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
          <div className='w-2/3 flex flex-row'>
            <h3 className="text-md font-semibold text-left text-gray-800">{title}</h3>
            <button className="flex justify-center items-center ml-2" onClick={() => modal.open()}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-gray-500"
                style={{ width: '0.75rem', height: '0.75rem' }}
              />
            </button>
          </div>
          <div className="w-1/3 text-xs text-right text-gray-500">
            <div className='text-right'>Target Date:</div>
            <div className="font-medium text-right">{targetDate}</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    
      <div className="flex flex-row gap-2 py-2">
        <ProgressBar progress={Number(progress)} />
        <div className="text-xs text-right text-gray-500 mt-1">{progress}%</div>
      </div>
    </Card>

)};

export default GoalCard;