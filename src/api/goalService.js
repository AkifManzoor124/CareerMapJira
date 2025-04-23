import { storage } from '@forge/api';

const STORAGE_KEY = 'user-goals';

export const getUserGoals = async (accountId) => {
  return await storage.get(`${STORAGE_KEY}:${accountId}`) || [];
};

export const saveUserGoals = async (accountId, goals) => {
  await storage.set(`${STORAGE_KEY}:${accountId}`, goals);
};

export const addUserGoal = async (accountId, goal) => {
  const existingGoals = await getUserGoals(accountId);
  const goals = await getUserGoals(accountId);
  const newGoal = { ...goal, id: Date.now().toString() };
  await saveUserGoals(accountId, [...goals, newGoal]);
  return newGoal;
};

export const updateGoal = async (accountId, updatedGoal) => {
  const goals = await getUserGoals(accountId);
  const updated = goals.map(goal =>
    goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal
  );
  await saveUserGoals(accountId, updated);
  return updated;
};

export const deleteUserGoal = async (accountId, goalId) => {
  console.log('Deleting user goal:', goalId);
  const goals = await getUserGoals(accountId);
  const updatedGoals = goals.filter(goal => goal.id !== goalId);
  await saveUserGoals(accountId, updatedGoals);
  return updatedGoals;
};