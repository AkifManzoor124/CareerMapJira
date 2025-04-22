// components/TicketVelocityCard.jsx
import React from 'react';
import Card from '../../Card/Card';

export const TicketVelocityCard = ({ ticketVelocity }) => (
  <Card>
    <div className="text-sm text-gray-500">Ticket Velocity</div>
    <div className="text-2xl font-semibold text-gray-800">{ticketVelocity} / week</div>
  </Card>
);

export default TicketVelocityCard;