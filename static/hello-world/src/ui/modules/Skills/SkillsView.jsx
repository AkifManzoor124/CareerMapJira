// src/ui/modules/Skills/SkillsView.jsx
import React from 'react';
import SkillXP from '../../components/SkillXP';

const SkillsView = ({ skills }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {skills.map(({ name, xp }, i) => (
        <SkillXP key={i} skill={name} xp={xp} />
      ))}
    </div>
  );
};

export default SkillsView;