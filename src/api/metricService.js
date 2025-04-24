import { storage } from '@forge/api';

const STORAGE_KEY = 'user-metrics';

const normalizeMetric = (metric) => ({
  ...metric,
  remaining: metric.remaining ?? 0,
  completed: metric.completed ?? 0,
});

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
  const newMetric = normalizeMetric({
    ...metric,
    isComplete: false,
    id: Date.now().toString(),
  });
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

  const updated = current.map(metric =>
    metric.id === update.id
      ? normalizeMetric({ ...metric, ...update })
      : metric
  );

  await setMetrics(accountId, updated);
  return updated.find(m => m.id === update.id);
};
