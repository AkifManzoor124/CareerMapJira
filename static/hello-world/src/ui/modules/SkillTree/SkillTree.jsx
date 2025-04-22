import React from 'react';
import { Card } from '../../components/Card/Card';

const skills = [
  { id: 1, label: 'Backend', x: 300, y: 50 },
  { id: 2, label: 'Frontend', x: 100, y: 150 },
  { id: 3, label: 'DevOps', x: 500, y: 150 },
  { id: 4, label: 'Databases', x: 100, y: 250 },
  { id: 5, label: 'UI/UX', x: 500, y: 250 },
  { id: 6, label: 'API Design', x: 300, y: 150 },
  { id: 7, label: 'Cloud', x: 300, y: 250 },
  { id: 8, label: 'Testing', x: 300, y: 350 },
];

const connections = [
  [1, 6],
  [6, 2],
  [6, 3],
  [2, 4],
  [3, 5],
  [6, 7],
  [7, 8],
];

const SkillTree = () => {
  return (
    <Card title="SKILL TREE">
      <svg width="600" height="400">
        {connections.map(([from, to], idx) => {
          const fromSkill = skills.find(s => s.id === from);
          const toSkill = skills.find(s => s.id === to);

          const midX = fromSkill.x;
          const midY = toSkill.y;

          return (
            <g key={idx}>
              {/* Vertical line down or up */}
              <line
                x1={fromSkill.x}
                y1={fromSkill.y}
                x2={midX}
                y2={midY}
                stroke="#cbd5e0"
                strokeWidth="2"
              />
              {/* Horizontal line left or right */}
              <line
                x1={midX}
                y1={midY}
                x2={toSkill.x}
                y2={midY}
                stroke="#cbd5e0"
                strokeWidth="2"
              />
            </g>
          );
        })}

      {skills.map(skill => (
        <g key={skill.id}>
          <circle cx={skill.x} cy={skill.y} r="30" fill="#3b82f6" />
          <text
            x={skill.x}
            y={skill.y + 4}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="bold"
          >
            {skill.label}
          </text>
        </g>
      ))}
      </svg>
    </Card>
  );
};

export default SkillTree;