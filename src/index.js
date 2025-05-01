import Resolver from '@forge/resolver';
import { getUserGoals, saveUserGoals, updateGoal, addUserGoal, deleteUserGoal } from './api/goalService';
import { getFeedbackNotes, saveFeedbackNote } from './api/feedbackService';
import { getAchievements, addAchievement } from './api/achievementService';
import { calculateXP, saveUserXP, getUserXP } from './api/xpService';
import { getCurrentLevel, getNextLevel } from './api/promotionService';
import { getUserJiraStats } from './api/jiraClient';
import { getOrCreateUserProfile } from './api/userService';
import { getMetrics, setMetrics, addMetric, deleteMetric, updateMetric} from './api/metricService';

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
    const stats = await getUserJiraStats();
    return stats;
  } catch (error) {
    console.error('Failed to fetch Jira stats:', error);
    return { error: 'Jira stats unavailable' };
  }
});

// Goals Area 
resolver.define('get-user-goals', async ({ context }) => {
  return await getUserGoals(context.accountId);
});

resolver.define('add-user-goal', async ({ context, payload }) => {
  return await addUserGoal(context.accountId, payload);
});

resolver.define('delete-user-goal', async ({ context, payload }) => {
  return await deleteUserGoal(context.accountId, payload.id);
});

resolver.define('update-goal-progress', async ({ context, payload }) => {
  const { goalId, progress } = payload;
  return await updateGoalProgress(context.accountId, goalId, progress);
});

resolver.define('update-user-goal', async ({ context, payload }) => {
  return await updateGoal(context.accountId, payload);
});

// Metric Areas
resolver.define('get-metrics', async ({ context }) => {
  return await getMetrics(context.accountId);
});

resolver.define('set-metrics', async ({ context, payload }) => {
  return await setMetrics(context.accountId, payload);
});

resolver.define('add-metric', async ({ context, payload }) => {
  return await addMetric(context.accountId, payload);
});

resolver.define('delete-metric', async ({ context, payload }) => {
  return await deleteMetric(context.accountId, payload.id);
});

resolver.define('update-metric', async ({ context, payload }) => {
  console.log('update-metric', payload);
  return await updateMetric(context.accountId, payload);
});


export const handler = resolver.getDefinitions();
