import React from 'react';
import { Shield, AlertTriangle, Globe } from 'lucide-react';

const threats = [
  {
    id: 1,
    type: 'Malware',
    name: 'Emotet Variant',
    severity: 'High',
    timestamp: '2 minutes ago',
    icon: Shield,
    color: 'text-red-500',
  },
  {
    id: 2,
    type: 'Phishing',
    name: 'Banking Credential Theft',
    severity: 'Medium',
    timestamp: '5 minutes ago',
    icon: Globe,
    color: 'text-yellow-500',
  },
  {
    id: 3,
    type: 'Attack',
    name: 'DDoS Attempt',
    severity: 'High',
    timestamp: '10 minutes ago',
    icon: AlertTriangle,
    color: 'text-orange-500',
  },
];

export function RecentThreats() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Recent Threats</h2>
      <div className="space-y-4">
        {threats.map((threat) => (
          <div key={threat.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className={`${threat.color} bg-opacity-10 p-2 rounded-lg`}>
              <threat.icon className={`w-5 h-5 ${threat.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{threat.name}</h3>
                <span className="text-sm text-gray-500">{threat.timestamp}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">{threat.type}</span>
                <span className="text-sm px-2 py-0.5 bg-red-100 text-red-700 rounded">
                  {threat.severity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}