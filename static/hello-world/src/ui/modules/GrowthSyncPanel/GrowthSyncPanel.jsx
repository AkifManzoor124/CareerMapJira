// components/GrowthSyncPanel.jsx
import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import GoalCard from '../../components/Card/GoalCard/GoalCard';
import { Modal, invoke } from '@forge/bridge';
import { useOnboarding } from '../OnboardingProvider/OnboardingProvider';

export const GrowthSyncPanel = ({userGoals, setUserGoals, initialSummary}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { pauseOnboarding, completeStepManually } = useOnboarding();

  const modal = new Modal({
    resource: 'add-goal-modal',
    onClose: async (payload) => {
        if (!payload || Object.keys(payload).length === 0) return;

        const newGoal = await invoke('add-user-goal', payload);
        setUserGoals((prev) => [...prev, payload]);
        completeStepManually(0);
    },
    size: 'medium',
    context: {
        modalType: 'add-goal',
        modalTitle: 'Add New Goal',
    },
  });

  return (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Growth Sync</h2>
                <p className="text-sm text-gray-500">Sync up with your manager on your personal and leadership development.</p>
            </div>
            <button
                data-tour="add-goal"
                onClick={() => {modal.open(); pauseOnboarding()}} // Step 0 = goalAdded}
                className="flex justify-end text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 cursor-pointer"
            >
                + Add Goal
            </button>
        </div>

        <div className='flex flex-row gap-4'>
            <div className="w-full flex flex-col gap-4 mb-6">
                {userGoals.map((goal, idx) => (
                <GoalCard key={idx} {...goal} setUserGoals={setUserGoals}/>
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