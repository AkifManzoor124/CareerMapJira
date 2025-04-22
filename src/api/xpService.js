import { storage } from '@forge/api';

const XP_KEY_PREFIX = 'user-xp';

export const calculateXP = ({ ticketsCompleted, epicsTouched, goals }) => {
  const XP_PER_TICKET = 10;
  const XP_PER_EPIC = 50;
  const XP_PER_GOAL_PERCENT = 2;

  const goalXP = goals?.reduce((acc, g) => acc + (g.progress * XP_PER_GOAL_PERCENT), 0) || 0;

  return (ticketsCompleted * XP_PER_TICKET) + (epicsTouched * XP_PER_EPIC) + goalXP;
};

export const saveUserXP = async (accountId, xp) => {
  await storage.set(`${XP_KEY_PREFIX}:${accountId}`, xp);
};

export const getUserXP = async (accountId) => {
  return await storage.get(`${XP_KEY_PREFIX}:${accountId}`) || 0;
};
