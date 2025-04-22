import { getAssignedIssues, getCurrentUser } from './jiraClient';

export const fetchUserAssignedData = async () => {
  const user = await getCurrentUser();
  const issues = await getAssignedIssues();

  return {
    user,
    issues
  };
};

// XP per completed issue — dead simple for now
const XP_PER_ISSUE = 10;

export const generateSkillMap = async () => {
    const { user, issues } = await fetchUserAssignedData();

    const skillMap = {};

    for (const issue of issues) {
        const { fields } = issue;

        const isDone = fields.status.name.toLowerCase() === 'done' || fields.resolution;
        if (!isDone) continue; // Skip incomplete work

        const labels = fields.labels || [];
        const components = (fields.components || []).map((c) => c.name);

        const allSkills = [...labels, ...components];

        allSkills.forEach((skill) => {
        if (!skillMap[skill]) {
            skillMap[skill] = {
            name: skill,
            ticketsCompleted: 0,
            xp: 0,
            lastUpdated: fields.updated,
            };
        }

        skillMap[skill].ticketsCompleted += 1;
        skillMap[skill].xp += XP_PER_ISSUE;

        // Update last activity timestamp if newer
        if (fields.updated > skillMap[skill].lastUpdated) {
            skillMap[skill].lastUpdated = fields.updated;
        }
        });
    }

    return {
        user: {
        accountId: user.accountId,
        displayName: user.displayName,
        email: user.emailAddress,
        },
        skills: Object.values(skillMap),
    };
};
