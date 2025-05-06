// onboardingStorage.js
import { storage } from '@forge/api';

const STORAGE_KEY = 'onboarding';

export const getOnboardingState = async (userId) => {
    console.log(`Fetching onboarding state for user: ${userId}`)
    console.log(`Storage key: ${STORAGE_KEY}:${userId}`)
    return await storage.get(`${STORAGE_KEY}:${userId}`) || { completedSteps: [], hasFinished: false };
}

export const setOnboardingState = async (userId, state) => {
    console.log(`Setting onboarding state for user: ${userId}`, state)
    return await storage.set(`${STORAGE_KEY}:${userId}`, state);
}

export const deleteOnboardingState = async (userId) => {
    console.log(`Storage key: ${STORAGE_KEY}:${userId}`)
    console.log(`Deleting onboarding state for user: ${userId}`)
    await storage.delete(`${STORAGE_KEY}:${userId}`);
    console.log("DELETED", await storage.get(`${STORAGE_KEY}:${userId}`))
    return true;
}
