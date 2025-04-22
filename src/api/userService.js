import { storage } from '@forge/api';
import api, { route } from '@forge/api';

const USER_KEY = 'user-profile';

// Get current Jira user info via API
const fetchJiraUser = async () => {
  const res = await api.asApp().requestJira(route`/rest/api/3/myself`);
  if (!res.ok) {
    console.error('Jira API Error:', res.status);
    throw new Error('Failed to fetch user info');
  }
  return await res.json();
};

// Load from storage
export const getUserProfile = async (accountId) => {
  return await storage.get(`${USER_KEY}:${accountId}`);
};

// Store to storage (can be used after fetch)
export const setUserProfile = async (accountId, userData) => {
  await storage.set(`${USER_KEY}:${accountId}`, userData);
  return userData;
};

// Get or fetch-and-store if missing
export const getOrCreateUserProfile = async (accountId) => {
  let user = await getUserProfile(accountId);

  if (!user) {
    const raw = await fetchJiraUser();
    user = {
      accountId: raw.accountId,
      displayName: raw.displayName,
      email: raw.emailAddress,
      avatarUrl: raw.avatarUrls['48x48'],
      createdAt: new Date().toISOString(),
    };
    await setUserProfile(accountId, user);
  }

  return user;
};
