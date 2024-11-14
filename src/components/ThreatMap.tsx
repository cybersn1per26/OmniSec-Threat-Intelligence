import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { format } from 'date-fns';
import * as d3 from 'd3-scale';

interface ThreatPoint {
  lat: number;
  lng: number;
  type: string;
  size: number;
  color: string;
  timestamp: Date;
}

const colorScale = d3.scaleOrdinal(['#ff4444', '#ffbb33', '#00C851'])
  .domain(['high', 'medium', 'low']);

export function ThreatMap() {
  const globeEl = useRef();
  const [threats, setThreats] = React.useState<ThreatPoint[]>([]);

  useEffect(() => {
    // Simulated real-time data updates
    const interval = setInterval(() => {
      const newThreat = {
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        type: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        size: Math.random() * 20 + 5,
        color: colorScale(['high', 'medium', 'low'][Math.floor(Math.random() * 3)]),
        timestamp: new Date(),
      };

      setThreats(prev => [...prev.slice(-50), newThreat]); // Keep last 50 threats
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Global Threat Map</h2>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            High Risk
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            Medium Risk
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Low Risk
          </span>
        </div>
      </div>
      
      <div className="h-[500px] relative">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={threats}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.1}
          pointRadius="size"
          pointsMerge={true}
          pointLabel={d => `
            <div class="bg-gray-900 text-white p-2 rounded-lg text-sm">
              <div>Type: ${d.type}</div>
              <div>Time: ${format(d.timestamp, 'HH:mm:ss')}</div>
              <div>Location: ${d.lat.toFixed(2)}°, ${d.lng.toFixed(2)}°</div>
            </div>
          `}
        />
      </div>
    </div>
  );
}