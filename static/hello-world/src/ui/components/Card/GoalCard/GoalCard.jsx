// components/GoalCard.jsx
import React, { useState}  from 'react';
import { Modal, invoke } from '@forge/bridge';
import Card from '../Card';
import ProgressBar from '../../ProgressBar/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export const GoalCard = ({ id, name, description, targetDate, progress, setUserGoals }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: async (payload) => {
      console.log('GoalCard - onClose called with', payload);
      // if payload undefined, do nothing
      if (!payload || Object.keys(payload).length === 0) return;
      // if delete is true, remove the goal from userGoals
      if (payload.delete) {
          console.log('deleting the goal');
          console.log("payload", payload);
          setUserGoals((prev) => prev.filter((goal) => goal.id !== payload.id));
          return;
      }
      console.log('updating the goal', payload);
      const updatedMetric = await invoke('update-user-goal', payload);

      console.log("updatedMetric", updatedMetric);  
      //find the metric being editted, and update it with the new payload
      setUserGoals((prev) => {
        const updated = prev.map((metric) => 
        metric.id === payload.id ? {...metric, ...payload} : metric);
        return updated;
      });

      console.log("after setUserGoals", updatedMetric);

    },
    size: 'medium',
    context: {
      modalType: 'add-goal',
      modalTitle: 'Edit Your Goal',
      id: id,
      name: name,
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
            <h3 className="text-md font-semibold text-left text-gray-800">{name}</h3>
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