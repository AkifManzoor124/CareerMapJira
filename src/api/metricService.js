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
  const current = await getMetrics(accountId);
  const newMetric = normalizeMetric({
    ...metric,
    id: metric.id ?? Date.now().toString(),
  });
  console.log('metricService Adding metric:', newMetric);
  return await setMetrics(accountId, [...current, newMetric]);
};

export const deleteMetric = async (accountId, id) => {
  console.log('Deleting metric:', id);
  const current = await getMetrics(accountId);
  const updated = current.filter(metric => metric.id !== id);
  return await setMetrics(accountId, updated);
};

export const updateMetric = async (accountId, updatedMetric) => {
  const currentMetrics = await getMetrics(accountId);

  console.log('current metric:', currentMetrics.id);
  console.log('update metric:', updatedMetric.id);

  const updated = currentMetrics.map(currentMetric =>
    currentMetric.id === updatedMetric.id
      ? normalizeMetric({ ...currentMetric, ...updatedMetric })
      : -1
  );

  if(updated.includes(-1)) {
    console.log('Metric not found for update:', updatedMetric.id);
    return null;
  }
  
  console.log('updated metric:', updated);

  await setMetrics(accountId, updated);
  return updated.find(m => m.id === updatedMetric.id);
};
