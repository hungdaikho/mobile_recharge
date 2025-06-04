import React from 'react';

interface ModuleCardProps {
  title: string;
  desc: string;
  color: 'blue' | 'purple' | 'orange' | 'green' | 'cyan' | 'red';
  onclick?: () => void;
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-400',
  green: 'bg-green-500',
  cyan: 'bg-cyan-500',
  red: 'bg-red-400',
};

const ModuleCard: React.FC<ModuleCardProps> = ({ title, desc, color, onclick }) => {
  return (
    <div className={`${colorMap[color]} rounded-xl shadow p-4 text-white cursor-pointer`} onClick={onclick}>
      <div className="font-semibold text-lg mb-1">{title}</div>
      <div className="text-sm opacity-90">{desc}</div>
    </div>
  );
};

export default ModuleCard; 