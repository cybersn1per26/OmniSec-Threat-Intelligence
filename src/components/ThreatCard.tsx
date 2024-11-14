import React from 'react';
import { AlertTriangle, Skull, Globe, Shield } from 'lucide-react';

interface ThreatCardProps {
  title: string;
  count: number;
  type: 'malware' | 'phishing' | 'vulnerability' | 'attack';
  trend: 'up' | 'down';
  percentage: number;
}

const iconMap = {
  malware: Skull,
  phishing: Globe,
  vulnerability: Shield,
  attack: AlertTriangle,
};

const colorMap = {
  malware: 'bg-red-500',
  phishing: 'bg-yellow-500',
  vulnerability: 'bg-blue-500',
  attack: 'bg-purple-500',
};

export function ThreatCard({ title, count, type, trend, percentage }: ThreatCardProps) {
  const Icon = iconMap[type];
  const bgColor = colorMap[type];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
          {trend === 'up' ? '+' : '-'}{percentage}%
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{count.toLocaleString()}</p>
      </div>
    </div>
  );
}