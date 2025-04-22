// src/ui/components/HeaderBar/HeaderBar.jsx
import React from 'react';

const HeaderBar = ({ user }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-700">CareerMap</h1>
      <div className="text-sm text-gray-600">Welcome, {user?.name || "User"}</div>
    </header>
  );
};

export default HeaderBar;