import React from 'react';

interface StatisticCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, change, positive = true }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <div className="text-gray-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className={`text-sm font-semibold flex items-center gap-1 ${positive ? 'text-green-600' : 'text-red-500'}`}>
        {positive ? '↑' : '↓'} {change}
      </div>
    </div>
  );
};

export default StatisticCard; 