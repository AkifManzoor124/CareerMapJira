import React from 'react';
import { Card } from '../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export const Achievements = ({ achievements }) => {
  return (
      <ul className="space-y-2">
        {achievements.length === 0 && (
          <p className="text-sm text-gray-400">No achievements yet.</p>
        )}
        {achievements.map((achievement, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 text-xs p-5 rounded-full">
                <FontAwesomeIcon icon={faEnvelope} />

              </span>
              <span>{achievement.description}</span>
            </div>
            <span className="text-gray-400 text-xs">
              {achievement.date || 'Recently'}
            </span>
          </li>
        ))}
      </ul>
  );
};
