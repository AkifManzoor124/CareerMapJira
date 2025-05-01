import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Card from '../../components/Card/Card';
import AchievementsList from '../AchievementsList/AchievementsList';
import SkillGapsCard from '../SkillGapsCard/SkillGapsCard';
import StatsCardGrid from '../StatsCardGrid/StatsCardGrid';
import GrowthSyncPanel from '../GrowthSyncPanel/GrowthSyncPanel';
import FloatingMenuButton from '../../components/FloatingMenuButton/FloatingMenuButton';
import FloatingStatusBadge from '../../components/FloatingStatusBadge/FloatingStatusBadge';

const initialSummary = `Hey Akif, I wanted to say you're doing a solid job with your current sprint work — especially how you broke down the payment service tasks. I noticed you've been steadily mentoring Umar on the backend side, which is awesome to see and aligns really well with your leadership goal.`

const initialGoals = [
  {
    name: 'Mentor a Junior Developer',
    description: 'Pair weekly for 30 minutes, support during sprint planning.',
    targetDate: '2025-06-01',
    progress: 60,
    id: 1,
  },
  {
    name: 'Learn GraphQL',
    description: 'Complete an online course and build an internal project',
    targetDate: '2025-07-15',
    progress: 20,
    id: 2,
  },
  {
    name: 'Improve Public Speaking',
    description: 'Practice and lead a knowledge share session',
    targetDate: '2025-10-01',
    progress: 10,
    id: 3,
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
  const [metrics, setMetrics] = useState([]);

  // Fetch once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userData,
          userGoals,
          feedbackNotes,
          achievements,
          userXP,
          jiraStats,
          fetchedMetrics
        ] = await Promise.all([
          invoke('get-user-data'),
          invoke('get-user-goals'),
          invoke('get-feedback-notes'),
          invoke('get-achievements'),
          invoke('get-user-xp'),
          invoke('get-user-jira-stats'),
          invoke('get-metrics')
        ]);

        setMetrics(fetchedMetrics);
        setAchievements(achievements);
        setUserGoals([...initialGoals, ...userGoals]);
        setFeedbackNotes(feedbackNotes);
        setUserXP(userXP);
        setJiraStats(jiraStats);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // // Log updated metrics
  // useEffect(() => {
  //   console.log('Metrics updated:', metrics);
  // }, [metrics]);


  if (loading) return <div className="p-4 text-gray-600">Loading CareerMap...</div>;

  if (!userData || userData.error) return <div className="p-4 text-red-600">Failed to load data.</div>;


  return (
    <div className="w-full flex flex-col p-6">
      
      <StatsCardGrid stats={getJiraStats}/>
      <FloatingMenuButton />
      <FloatingStatusBadge />

      <div className="flex flex-row gap-4">
        <div className="w-14/24 flex flex-col gap-4">
          <GrowthSyncPanel userGoals={userGoals} setUserGoals={setUserGoals} initialSummary={initialSummary}/>
          <AchievementsList achievements={achievements}/>
        </div>

        <Card style={"w-10/24"}>
          <div className="flex flex-col gap-4">
            {/* <CurrentLevelCard currentLevel={userData.currentLevel}/> */}
            <SkillGapsCard metrics={metrics} setMetrics={setMetrics}/>
            {/* <PromotionTracker nextLevel={userData.targetLevel.title} progress={0.23} /> */}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;