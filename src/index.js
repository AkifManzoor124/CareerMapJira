import Resolver from '@forge/resolver';
import { generateSkillMap } from './api/skillService';
import { getUserGoals, updateGoalProgress } from './api/goalService';
import { getFeedbackNotes, saveFeedbackNote } from './api/feedbackService';
import { getAchievements, addAchievement } from './api/achievementService';
import { calculateXP, saveUserXP, getUserXP } from './api/xpService';
import { getCurrentLevel, getNextLevel } from './api/promotionService';
import { getUserJiraStats } from './api/jiraClient';
import { getOrCreateUserProfile } from './api/userService';
import { getFocusAreas, setFocusAreas, updateFocusProgress } from './api/focusService';

const resolver = new Resolver();

// User Data
resolver.define('get-user-data', async ({ context }) => {
  const { accountId } = context;
  try {
    return await getOrCreateUserProfile(context.userData);
    if (!userData) {
      throw new Error('User data not found');
    }
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { error: 'User data unavailable' };
  }
});

// Goals
resolver.define('get-user-goals', async ({ context }) => {
  return await getUserGoals(context.accountId);
});

resolver.define('update-goal-progress', async ({ context, payload }) => {
  const { goalId, progress } = payload;
  return await updateGoalProgress(context.accountId, goalId, progress);
});

// Feedback Notes
resolver.define('get-feedback-notes', async ({ context }) => {
  return await getFeedbackNotes(context.accountId);
});

resolver.define('save-feedback-note', async ({ context, payload }) => {
  return await saveFeedbackNote(context.accountId, payload.note);
});

// Achievements
resolver.define('get-achievements', async ({ context }) => {
  return await getAchievements(context.accountId);
});

resolver.define('add-achievement', async ({ context, payload }) => {
  const { title, description } = payload;
  return await addAchievement(context.accountId, title, description);
});

// XP
resolver.define('calculate-xp', async ({ context, payload }) => {
  const xp = calculateXP(payload);
  await saveUserXP(context.accountId, xp);
  return { xp };
});

resolver.define('get-user-xp', async ({ context }) => {
  const xp = await getUserXP(context.accountId);
  const currentLevel = getCurrentLevel(xp);
  const nextLevel = getNextLevel(xp);
  return { xp, currentLevel, nextLevel };
});

// Jira Stats
resolver.define('get-user-jira-stats', async ({ context }) => {
  try {
    console.log('Fetching Jira stats...');
    const stats = await getUserJiraStats();
    return stats;
  } catch (error) {
    console.error('Failed to fetch Jira stats:', error);
    return { error: 'Jira stats unavailable' };
  }
});

// Focus Areas
resolver.define('get-focus-areas', async ({ context }) => {
  return await getFocusAreas(context.accountId);
});

resolver.define('set-focus-areas', async ({ context, payload }) => {
  return await setFocusAreas(context.accountId, payload.areas);
});

resolver.define('update-focus-progress', async ({ context }) => {
  return await updateFocusProgress(context.accountId);
});




export const handler = resolver.getDefinitions();
