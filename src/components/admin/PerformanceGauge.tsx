import React from 'react';

const PerformanceGauge: React.FC<{ value: number }> = ({ value }) => {
  // Clamp value từ 0 đến 100
  const percent = Math.max(0, Math.min(100, value));
  const angle = (percent / 100) * 180;
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
      <div className="text-gray-500 text-sm font-medium mb-1">Performance</div>
      <svg width="80" height="40" viewBox="0 0 80 40">
        <path d="M10,40 A30,30 0 0,1 70,40" fill="none" stroke="#d1fae5" strokeWidth="8" />
        <path
          d="M10,40 A30,30 0 0,1 70,40"
          fill="none"
          stroke="url(#gauge)"
          strokeWidth="8"
          strokeDasharray="94.25"
          strokeDashoffset={94.25 - (94.25 * percent) / 100}
        />
        <defs>
          <linearGradient id="gauge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#f59e42" />
          </linearGradient>
        </defs>
        {/* Kim gauge */}
        <line
          x1="40"
          y1="40"
          x2={40 + 30 * Math.cos(Math.PI - (angle * Math.PI) / 180)}
          y2={40 - 30 * Math.sin((angle * Math.PI) / 180)}
          stroke="#f59e42"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export default PerformanceGauge; 