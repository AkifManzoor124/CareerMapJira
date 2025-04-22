// src/ui/modules/TaskFeed/TaskFeed.jsx
import React from 'react';
import Card from '../../components/Card';

const TaskFeed = ({ tasks }) => {
  return (
    <Card title="Recent Tasks">
      <ul className="divide-y divide-gray-200 text-sm">
        {tasks.map((task, idx) => (
          <li key={idx} className="py-2">
            <span className="font-medium text-gray-800">{task.summary}</span>
            <p className="text-gray-500">{task.project} • {task.status}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TaskFeed;