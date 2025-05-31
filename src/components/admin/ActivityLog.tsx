import React from 'react';

const logs = [
  { type: 'success', text: 'Credit transfer', time: '2h ago' },
  { type: 'success', text: 'Payment received', time: '2h ago' },
  { type: 'new', text: 'New user egistered', time: '1d ago' },
  { type: 'recharge', text: 'Mobile recharge', time: '1d ago' },
];

const iconMap: Record<string, JSX.Element> = {
  success: <span className="text-green-500">✔</span>,
  new: <span className="text-pink-500">●</span>,
  recharge: <span className="text-orange-400">⬆</span>,
};

const ActivityLog: React.FC = () => (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="font-semibold mb-2">Recent Activity</h3>
    <ul className="space-y-2">
      {logs.map((log, idx) => (
        <li key={idx} className="flex items-center gap-2 text-sm">
          {iconMap[log.type]}
          <span>{log.text}</span>
          <span className="ml-auto text-gray-400">{log.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityLog; 