import { storage } from '@forge/api';

const STORAGE_KEY = 'user-goals';

export const getUserGoals = async (accountId) => {
  return await storage.get(`${STORAGE_KEY}:${accountId}`) || [];
};

export const saveUserGoals = async (accountId, goals) => {
  await storage.set(`${STORAGE_KEY}:${accountId}`, goals);
};

export const updateGoalProgress = async (accountId, goalId, progress) => {
  const goals = await getUserGoals(accountId);
  const updatedGoals = goals.map(g => g.id === goalId ? { ...g, progress } : g);
  await saveUserGoals(accountId, updatedGoals);
  return updatedGoals;
};
