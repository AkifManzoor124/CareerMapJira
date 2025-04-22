// src/ui/components/ErrorMessage/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-sm border border-red-300">
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;