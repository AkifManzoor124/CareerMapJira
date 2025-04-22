import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Card from '../../components/Card/Card';

import AchievementsList from '../AchievementsList/AchievementsList';
import CurrentLevelCard from '../CurrentLevelCard/CurrentLevelCard';
import SkillGapsCard from '../SkillGapsCard/SkillGapsCard';
import PromotionTracker from '../PromotionTracker/PromotionTracker';
import StatsCardGrid from '../StatsCardGrid/StatsCardGrid';
import GrowthSyncPanel from '../GrowthSyncPanel/GrowthSyncPanel';

const initialSummary = `Hey Akif, I wanted to say you're doing a solid job with your current sprint work — especially how you broke down the payment service tasks. I noticed you've been steadily mentoring Umar on the backend side, which is awesome to see and aligns really well with your leadership goal.`

const initialGoals = [
  {
    title: 'Mentor a Junior Developer',
    description: 'Pair weekly for 30 minutes, support during sprint planning.',
    targetDate: '2025-06-01',
    progress: 60,
  },
  {
    title: 'Learn GraphQL',
    description: 'Complete an online course and build an internal project',
    targetDate: '2025-07-15',
    progress: 20,
  },
  {
    title: 'Improve Public Speaking',
    description: 'Practice and lead a knowledge share session',
    targetDate: '2025-10-01',
    progress: 10,
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: 'John Doe',
    skills: ['JavaScript', 'React', 'Node.js'],
    targetLevel: { title: 'Senior Developer', xpRequired: 2000 },
    currentLevel: { title: 'Mid-Level Developer', xpCurrent: 1500 },
  });
  const [userGoals, setUserGoals] = useState(initialGoals);
  const [feedbackNotes, setFeedbackNotes] = useState(initialSummary);
  const [achievements, setAchievements] = useState([]);
  const [getUserXP, setUserXP] = useState();
  const [getJiraStats, setJiraStats] = useState({});
  const [focusAreas, setFocusAreas] = useState(
    [
    { name: 'DevOps', completed: 3, required: 5 },
    { name: 'Frontend', completed: 3, required: 9 },
    { name: 'Database', completed: 2, required: 5 },
    { name: 'UI/UX', completed: 7, required: 8 },
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await invoke('get-user-data');
        const userGoals = await invoke('get-user-goals');
        const feedbackNotes = await invoke('get-feedback-notes');
        const getAchievements = await invoke('get-achievements');
        const getUserXP = await invoke('get-user-xp');
        const getJiraStats = await invoke('get-user-jira-stats');
        const focusAreas = await invoke('get-focus-areas');

        // setUserData(userData);
        // setFocusAreas(focusAreas);
        setAchievements(getAchievements);
        setUserGoals(userGoals);
        setFeedbackNotes(feedbackNotes);
        setUserXP(getUserXP);
        setJiraStats(getJiraStats);
        
      } catch (error) {
        console.error('Error fetching resolver data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-gray-600">Loading CareerMap...</div>;

  if (!userData || userData.error) return <div className="p-4 text-red-600">Failed to load data.</div>;


  return (
    <div className="w-full flex flex-col p-6">
      
      <StatsCardGrid stats={getJiraStats}/>

      <div className="flex flex-row gap-4">
        <div className="w-2/3 flex flex-col gap-4">
          <GrowthSyncPanel initialGoals={initialGoals} initialSummary={initialSummary}/>
          <AchievementsList achievements={achievements}/>
        </div>

        <Card style={"w-1/2"}>
          <div className="flex flex-col gap-4">
            <CurrentLevelCard currentLevel={userData.currentLevel}/>
            <SkillGapsCard gaps={focusAreas}/>
            <PromotionTracker nextLevel={userData.targetLevel.title} progress={0.23} />
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;