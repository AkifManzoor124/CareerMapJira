import React, { useState } from 'react';
import Card from '../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTimes } from '@fortawesome/free-solid-svg-icons';
import { router } from '@forge/bridge';
import backlogImage from '../../../assets/backlog.png';

const FloatingStatusBadge = () => {
  const [minimized, setMinimized] = useState(false);

  const openBoard = () => {
    router.open('https://jobtrajectory.atlassian.net/jira/software/projects/CAR/boards/1/backlog');
  };

  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 cursor-pointer" onClick={() => setMinimized(false)}>
        <div className='flex flex-row justify-center items-center'>
            <div className="flex justify-center items-center p-3 rounded-full border border-gray-200 shadow-lg bg-white hover:shadow-xl transition">
                <FontAwesomeIcon icon={faWrench} className="w-5 h-5 text-gray-600 text-sm" />
            <p className="text-gray-600 text-sm">&emsp; View Our Progress!</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card style={"p-2 flex flex-row"}>
        <div className="flex justify-between items-start w-1/2">
          <div className="flex justify-center items-center w-full mr-4">
            <img src={backlogImage} alt="CareerOS logo" className="w-40 h-24 mr-2 rounded-md" />
          </div>
        </div>

        <div className="w-full">
            <div className='flex justify-between'>
                <p className="text-gray-600 text-sm font-semibold">We're actively improving CareerOS.</p>
                <div onClick={() => setMinimized(true)} className="flex justify-center items-center w-5 h-5 rounded-full border border-gray-200 bg-white hover:shadow-xl transition">
                    <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-sm w-1/2" />
                </div>
            </div>
          <p className="text-gray-600 text-xs">🎉 A big thank you to our valued testers! 🎉</p>

          <p className="text-xs text-gray-600 mt-4 leading-relaxed">
            New features are being added regularly. 🔧<br />
              &emsp;<span className="line-through">• 🐞 Long metric names will soon wrap correctly. <br /></span>
              &emsp;<span className="line-through">• 🐞 Improved progress tracking for all metrics. <br /></span>
              &emsp;• 🛠️ Ability to manually track and update personal Achievements <br />
              &emsp;• 🚀 We're currently being reviewed for the Atlassian Marketplace!
          </p>

          <p className="text-xs text-blue-500 underline mt-2 cursor-pointer" onClick={openBoard}>
            Check our progress
          </p>
        </div>
      </Card>
    </div>
  );
};

export default FloatingStatusBadge;
