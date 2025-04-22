// components/StatsCardGrid.jsx
import React from 'react';
import TicketStatsCard from '../../components/Card/TicketStatsCard/TicketStatsCard';
import TicketVelocityCard from '../../components/Card/TicketVelocityCard/TicketVelocityCard';
import EpicContributionCard from '../../components/Card/EpicContributionCard/EpicContributionCard';
import SkillDiversityCard from '../../components/Card/SkillDiversityCard/SkillDiversityCard';
import ConceptPieChartCard from '../../components/Card/ConceptPieChartCard/ConceptPieChartCard';

const StatsCardGrid = ({ stats }) => {
  return (
    <div className="flex flex-row gap-4 mb-6">
      <TicketStatsCard title="Jira Tickets Completed" value={stats.ticketsCompleted} />
      <TicketStatsCard title="Avg Story Points" value={stats.avgStoryPoints} />
      <TicketStatsCard title="Tickets This Sprint" value={stats.ticketsThisSprint} />
      <TicketStatsCard title="Avg Time to Completion" value={`${stats.avgCompletionTime} days`} />
      <TicketVelocityCard ticketVelocity={stats.ticketVelocity} />
      {/* <EpicContributionCard epicsTouched={stats.epicsTouched} /> */}
      {/* <SkillDiversityCard skills={stats.skills} /> */}
      {/* <ConceptPieChartCard data={stats.conceptBreakdown} /> */}
    </div>
  );
};

export default StatsCardGrid;
