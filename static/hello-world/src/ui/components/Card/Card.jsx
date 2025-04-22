import React from "react";

export const Card = ({ title, children, style = "" }) => (
  <div className={`w-full bg-white border border-gray-400 rounded-lg p-4 shadow-sm ${style}`}>
    <h3 className="text-xl text-gray-800 font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default Card;