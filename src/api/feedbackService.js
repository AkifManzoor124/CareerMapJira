import { storage } from '@forge/api';

const FEEDBACK_KEY = 'sync-feedback';

export const getFeedbackNotes = async (accountId) => {
  return await storage.get(`${FEEDBACK_KEY}:${accountId}`) || [];
};

export const saveFeedbackNote = async (accountId, note) => {
  const existing = await getFeedbackNotes(accountId);
  const updated = [...existing, { note, date: new Date().toISOString() }];
  await storage.set(`${FEEDBACK_KEY}:${accountId}`, updated);
  return updated;
};
