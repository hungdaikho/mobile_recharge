import React from 'react';

const RevenueChart: React.FC = () => (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="font-semibold mb-2">Revenue Statistics</h3>
    {/* Simple mock chart using SVG */}
    <svg viewBox="0 0 200 60" className="w-full h-16">
      <polyline
        fill="url(#gradient)"
        stroke="#4f46e5"
        strokeWidth="3"
        points="0,50 20,40 40,45 60,30 80,35 100,20 120,25 140,10 160,30 180,15 200,40"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <div className="flex justify-between text-xs text-gray-400 mt-1">
      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
    </div>
  </div>
);

export default RevenueChart; 