import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Database } from 'lucide-react';

export default function Sources() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Threat Sources</h1>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Source management coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}