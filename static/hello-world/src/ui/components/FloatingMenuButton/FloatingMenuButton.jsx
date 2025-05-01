// components/FloatingMenuButton.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router } from '@forge/bridge';
import { faBug, faLightbulb, faBars } from '@fortawesome/free-solid-svg-icons';

const FloatingMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start space-y-3">
      {isOpen && (
        <>
          <button
            onClick={() => router.open("https://jobtrajectory.atlassian.net/jira/software/projects/CAR/form/1?atlOrigin=eyJpIjoiNjFmYzZlY2IyMWI1NDJkMmI3MjdkMjJmMzEyZjZlOTIiLCJwIjoiaiJ9", '_blank')}
          >
            <div className='flex flex-row justify-center items-center'>
              <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 shadow-lg bg-white hover:shadow-xl transition">
                <FontAwesomeIcon icon={faLightbulb} className="text-gray-600 text-sm w-1/2" />
              </div>
              <div className='p-2 border-gray-200 shadow-lg bg-white rounded-lg'>
                <p className="text-gray-600 text-sm">Feedback Request</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => router.open("https://jobtrajectory.atlassian.net/jira/software/projects/CAR/form/2?atlOrigin=eyJpIjoiMjliNzJiYWUwYTZjNDE1NWE5Njc4ZDU4MDM3ODhlMjkiLCJwIjoiaiJ9", '_blank')}
          >
            <div className='flex flex-row items-center'>
              <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 shadow-lg bg-white hover:shadow-xl transition">
                <FontAwesomeIcon icon={faBug} className="text-gray-600 text-sm w-1/2" />
              </div>
              <div className='p-2 border-gray-200 shadow-lg bg-white rounded-lg'>
                <p className="text-gray-600 text-sm">Report a Bug</p>
              </div>
            </div>
          </button>
        </>
      )}
      <button
        onClick={toggleMenu}
        className="w-10 h-10 rounded-full border border-gray-200 shadow-lg bg-white hover:shadow-xl transition transform"
      >
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faBars} className="text-gray-700 text-sm w-1/2" />
        </div>
      </button>
    </div>
  );
};

export default FloatingMenuButton;
