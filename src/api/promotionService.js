const LEVELS = [
    { title: 'Junior Developer', threshold: 0 },
    { title: 'Intermediate Backend Developer', threshold: 500 },
    { title: 'Senior Backend Developer', threshold: 2000 },
    { title: 'Project Architect', threshold: 4000 },
  ];
  
  export const getCurrentLevel = (xp) => {
    return LEVELS.reduce((current, level) => xp >= level.threshold ? level : current, LEVELS[0]);
  };
  
  export const getNextLevel = (xp) => {
    return LEVELS.find(level => xp < level.threshold) || LEVELS[LEVELS.length - 1];
  };
  