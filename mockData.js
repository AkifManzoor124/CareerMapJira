export const mockUserData = {
  user: {
    accountId: "abc-123",
    displayName: "Akif Manzoor",
    email: "akif@careermap.com",
  },
  currentLevel: {
    title: "Intermediate Backend Developer",
    levelNumber: 3,
    xpRequired: 500,
    currentXp: 420,
    progressPercent: 84,
  },
  targetLevel: {
    title: "Senior Backend Developer",
    levelNumber: 4,
    xpRequired: 700,
    progressPercent: 60,
  },
  skills: [
    {
      name: "backend",
      ticketsCompleted: 14,
      xp: 140,
      lastUpdated: "2025-04-09T14:32:00.000Z",
      skillTreePathCompleted: 80,
    },
    {
      name: "frontend",
      ticketsCompleted: 8,
      xp: 80,
      lastUpdated: "2025-04-08T10:10:00.000Z",
      skillTreePathCompleted: 40,
    },
    {
      name: "api-integration",
      ticketsCompleted: 6,
      xp: 60,
      lastUpdated: "2025-04-07T12:12:00.000Z",
      skillTreePathCompleted: 60,
    },
    {
      name: "devops",
      ticketsCompleted: 4,
      xp: 40,
      lastUpdated: "2025-04-06T11:11:00.000Z",
      skillTreePathCompleted: 20,
    },
    {
      name: "project-management",
      ticketsCompleted: 10,
      xp: 100,
      lastUpdated: "2025-04-05T09:09:00.000Z",
      skillTreePathCompleted: 50,
    },
  ],
  recentAchievements: [
    {
      title: "Built Microservices in 3 Projects",
      date: "2025-04-09",
      description: "Completed backend microservices architecture in 3 major projects.",
    },
    {
      title: "Led Project Sprint Retrospective",
      date: "2025-04-07",
      description: "Facilitated a retrospective for a cross-functional team.",
    },
    {
      title: "Integrated 3rd Party APIs",
      date: "2025-04-06",
      description: "Successfully integrated payment and analytics APIs.",
    },
  ],
  skillGaps: [
    {
      name: "UI/UX",
      description: "Low exposure to Frontend (2 tasks in last 90 days).",
      recommendation: "Consider taking on a frontend-heavy feature.",
      completed: 2,
      required: 5,
    },
    {
      name: "DevOps",
      description: "Minimal experience with CI/CD pipelines.",
      recommendation: "Automate a deployment pipeline for a side project.",
      completed: 4,
      required: 10,
    },
    {
      name: "Cloud Infrastructure",
      description: "Minimal experience with CI/CD pipelines.",
      recommendation: "Automate a deployment pipeline for a side project.",
      completed: 0,
      required: 5,
    },
    {
      name: "Security",
      description: "Minimal experience with CI/CD pipelines.",
      recommendation: "Automate a deployment pipeline for a side project.",
      completed: 0,
      required: 5,
    },
  ],
  stats: {
    ticketsCompleted: 42, // sum of ticketsCompleted in skills
    avgStoryPoints: 3, // placeholder – assume manually assigned
    ticketsThisSprint: 6, // placeholder
    avgCompletionTime: 2.8, // days – mock avg
    ticketsPerWeek: 9, // mock weekly average
    epicsTouched: 5, // mock epic spread
    skills: ["backend", "frontend", "api-integration", "devops", "project-management"],
    conceptBreakdown: {
      "Backend": 33,
      "Frontend": 20,
      "API Integration": 15,
      "DevOps": 10,
      "Project Management": 22,
    },
  },
};
