import api, { route } from "@forge/api";

const BASE_API = '/rest/api/3';
const SEARCH_ENDPOINT = '/search';

const fetchJira = async (jql, fields = []) => {
  const queryParams = new URLSearchParams({
    jql,
    maxResults: '50',
    fields: fields.join(','),
  });

  const url = route`/rest/api/3/search?${queryParams}`;

  const res = await api.asUser().requestJira(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    console.error(`❌ Jira API Error: ${res.status} ${res.statusText}`);
    throw new Error('Failed to fetch Jira data');
  }

  const data = await res.json();
  return data.issues;
};


// 🧮 Completed tickets
export const getCompletedTickets = async () => {
  return await fetchJira(
    'assignee=currentUser() AND statusCategory=Done ORDER BY updated DESC',
    ['summary', 'status', 'created', 'resolutiondate', 'customfield_10016']
  );
};

// 📆 Current sprint tickets (not done)
export const getTicketsInCurrentSprint = async () => {
  return await fetchJira(
    'assignee=currentUser() AND sprint in openSprints() ORDER BY updated DESC',
    ['summary', 'status', 'created', 'resolutiondate', 'sprint', 'customfield_10016']
  );
};

// 📊 Average Story Points
export const getAverageStoryPoints = (tickets, field = 'customfield_10016') => {
  const valid = tickets.filter(t => t.fields?.[field] != null);
  const total = valid.reduce((sum, t) => sum + t.fields[field], 0);
  return valid.length ? (total / valid.length).toFixed(1) : 0;
};

// ⏱️ Completion time in days
export const getAverageCompletionTime = (tickets) => {
  const resolved = tickets.filter(t => t.fields.resolutiondate);
  const totalDays = resolved.reduce((sum, t) => {
    const created = new Date(t.fields.created);
    const resolved = new Date(t.fields.resolutiondate);
    return sum + (resolved - created) / (1000 * 60 * 60 * 24);
  }, 0);
  return resolved.length ? (totalDays / resolved.length).toFixed(2) : 0;
};

// 🚀 Velocity = done tickets / number of weeks in window
export const getTicketVelocity = (tickets, weeks = 4) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - weeks * 7);

  const recent = tickets.filter(t =>
    t.fields.resolutiondate &&
    new Date(t.fields.resolutiondate) > cutoff
  );

  return recent.length ? (recent.length / weeks).toFixed(1) : 0;
};

// 🧱 Unique epics contributed to
export const getEpicsTouched = (tickets, field = 's') => {
  const epicSet = new Set();
  tickets.forEach(t => {
    const epicKey = t.fields?.[field];
    if (epicKey) epicSet.add(epicKey);
  });
  return epicSet.size;
};

// 📊 Aggregate function
export const getUserJiraStats = async () => {
  const completed = await getCompletedTickets();
  const sprint = await getTicketsInCurrentSprint();

  return {
    ticketsCompleted: completed.length,
    avgStoryPoints: getAverageStoryPoints(completed),
    ticketsThisSprint: sprint.length,
    avgCompletionTime: getAverageCompletionTime(completed),
    ticketVelocity: getTicketVelocity(completed),
    epicsTouched: getEpicsTouched(completed),
  };
};
