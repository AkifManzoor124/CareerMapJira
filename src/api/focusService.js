import { storage } from '@forge/api';
import { getCompletedTickets } from './jiraClient';

const STORAGE_KEY = 'user-focus-areas';

export const getFocusAreas = async (accountId) => {
  return await storage.get(`${STORAGE_KEY}:${accountId}`) || [];
};

export const setFocusAreas = async (accountId, areas) => {
  await storage.set(`${STORAGE_KEY}:${accountId}`, areas);
  return areas;
};

// Called periodically or on refresh
export const updateFocusProgress = async (accountId) => {
  const focusAreas = await getFocusAreas(accountId);
  const tickets = await getCompletedTickets();

  const updatedAreas = focusAreas.map(area => {
    const matches = tickets.filter(ticket => {
      const labels = ticket.fields.labels || [];
      const components = (ticket.fields.components || []).map(c => c.name);
      return labels.includes(area.name) || components.includes(area.name);
    });

    const completed = matches.length;
    const isComplete = completed >= area.requiredTickets;

    return {
      ...area,
      completedTickets: completed,
      isComplete,
      gainedXP: isComplete ? area.xpReward : 0,
    };
  });

  // Save updated status
  await setFocusAreas(accountId, updatedAreas);
  return updatedAreas;
};
