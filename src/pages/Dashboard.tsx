import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ThreatCard } from '../components/ThreatCard';
import { ThreatMap } from '../components/ThreatMap';
import { RecentThreats } from '../components/RecentThreats';

export default function Dashboard() {
  const threatStats = [
    { title: 'Active Malware', count: 1234, type: 'malware', trend: 'up', percentage: 12 },
    { title: 'Phishing Sites', count: 856, type: 'phishing', trend: 'down', percentage: 5 },
    { title: 'Vulnerabilities', count: 432, type: 'vulnerability', trend: 'up', percentage: 8 },
    { title: 'Active Attacks', count: 89, type: 'attack', trend: 'down', percentage: 3 },
  ] as const;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Threat Intelligence Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {threatStats.map((stat) => (
              <ThreatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ThreatMap />
            </div>
            <div>
              <RecentThreats />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}