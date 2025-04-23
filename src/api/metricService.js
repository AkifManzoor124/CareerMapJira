import { storage } from '@forge/api';
import { getCompletedTickets } from './jiraClient';

const STORAGE_KEY = 'user-metrics';

export const getMetrics = async (accountId) => {
  return await storage.get(`${STORAGE_KEY}:${accountId}`) || [];
};

export const setMetrics = async (accountId, metrics) => {
  await storage.set(`${STORAGE_KEY}:${accountId}`, metrics);
  return metrics;
};

export const addMetric = async (accountId, metric) => {
  console.log('metricService Adding metric:', metric);
  const current = await getMetrics(accountId);
  const newMetric = {
    ...metric,
    isComplete: false,
    id: Date.now().toString(),
  };
  return await setMetrics(accountId, [...current, newMetric]);
};

export const deleteMetric = async (accountId, id) => {
  console.log('Deleting metric:', id);
  const current = await getMetrics(accountId);
  const updated = current.filter(metric => metric.id !== id);
  return await setMetrics(accountId, updated);
};

export const updateMetric = async (accountId, update) => {
  const current = await getMetrics(accountId);

  console.log("current", current);
  console.log("updating metric with updates", update);

  const updated = current.map(metric =>
    metric.id === update.id ? { ...metric, ...update } : metric
  );

  console.log(current);
  console.log("updating metric with updates", update.id);
  console.log("metrics after", current);

  await setMetrics(accountId, updated);

  const updatedNow = await getMetrics(accountId);

  console.log("updatedNow", updatedNow);
  return updated.find(m => m.id === update.id);
};