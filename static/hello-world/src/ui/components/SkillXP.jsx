import { Card } from './Card';

// SkillTree Component (Basic Placeholder)
export const SkillXP = ({ skills }) => (
    <Card title="Your Skills">
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <Card key={skill.name} title={skill.name}>
            <p className="text-gray-600 mb-2">XP: {skill.xp}</p>
            <p className="text-gray-600 mb-2">Tickets Completed: {skill.ticketsCompleted}</p>
            <ProgressBar value={skill.xp} max={500} />
          </Card>
        ))}
      </div>
    </Card>
  );
  