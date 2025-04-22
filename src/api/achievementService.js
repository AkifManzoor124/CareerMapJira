import { storage } from '@forge/api';

const ACH_KEY = 'user-achievements';

export const getAchievements = async (accountId) => {
  return await storage.get(`${ACH_KEY}:${accountId}`) || [];
};

export const addAchievement = async (accountId, title, description) => {
  const existing = await getAchievements(accountId);
  const newEntry = {
    title,
    description,
    date: new Date().toISOString(),
  };
  const updated = [...existing, newEntry];
  await storage.set(`${ACH_KEY}:${accountId}`, updated);
  return updated;
};
