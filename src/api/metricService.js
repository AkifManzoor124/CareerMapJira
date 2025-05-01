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
  return await setMetrics(accountId, [...current, newMetric]);
};

export const deleteMetric = async (accountId, id) => {
  const current = await getMetrics(accountId);
  const updated = current.filter(metric => metric.id !== id);
  return await setMetrics(accountId, updated);
};

export const updateMetric = async (accountId, updatedMetric) => {
  const currentMetrics = await getMetrics(accountId);

  const updated = currentMetrics.map((metric) =>
    String(metric.id) === String(updatedMetric.id)
      ? normalizeMetric({ ...metric, ...updatedMetric })
      : metric
  );

  const found = updated.some((metric) => String(metric.id) === String(updatedMetric.id));

  if (!found) {
    console.error('Metric not found for update:', updatedMetric.id);
    return null;
  }

  await setMetrics(accountId, updated);
  return updated.find((m) => String(m.id) === String(updatedMetric.id));
};
