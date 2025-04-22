import React from 'react';

const ConnectJiraCTA = ({ onConnect }) => {
  return (
    <div className="border rounded-lg p-6 text-center shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">Connect to Jira</h2>
      <p className="mb-4 text-gray-600">Authorize CareerMap to access your Jira account and begin mapping your career journey.</p>
      <button
        onClick={onConnect}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Connect Jira Account
      </button>
    </div>
  );
};

export default ConnectJiraCTA;
