// components/GrowthSyncPanel.jsx
import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import GoalCard from '../../components/Card/GoalCard/GoalCard';
import { Modal } from '@forge/bridge';


export const GrowthSyncPanel = ({initialGoals, initialSummary}) => {
  const [goals, setGoals] = useState(initialGoals);
  const [isModalOpen, setModalOpen] = useState(false);

  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: (payload) => {
      console.log('onClose called with', payload);
    },
    size: 'medium',
    context: {
        modalTitle: 'Add New Goal',
    },
  });

  const handleAddGoal = (goal) => {
    setGoals([...goals, goal]);
    setModalOpen(false);
  };

  return (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Growth Sync</h2>
                <p className="text-sm text-gray-500">Sync up with your manager on your personal and leadership development.</p>
            </div>
            <button
                onClick={() => modal.open()}
                className="flex justify-end text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
                + Add Goal
            </button>
        </div>

        <div className='flex flex-row gap-4'>
            <div className="w-full flex flex-col gap-4 mb-6">
                {goals.map((goal, idx) => (
                <GoalCard key={idx} {...goal} />
                ))}
            </div>

            {/* <div className="w-1/3 flex">
                <div className="bg-gray-50 rounded-lg p-4 border text-sm">
                <label className="block font-medium text-gray-600 mb-2">1:1 Sync Summary</label>
                <p className="text-gray-700">{initialSummary}</p>
                </div>
            </div> */}
        </div>
    </Card>

  );
};

export default GrowthSyncPanel;