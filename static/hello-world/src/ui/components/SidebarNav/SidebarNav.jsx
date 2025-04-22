// src/ui/components/SidebarNav/SidebarNav.jsx
import React from 'react';

const SidebarNav = ({ links = [], active, onSelect }) => {
  return (
    <nav className="w-64 h-full bg-white border-r p-4">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.key}>
            <button
              className={`w-full text-left px-4 py-2 rounded ${active === link.key ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => onSelect(link.key)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;