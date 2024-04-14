// components/MetricCharts.tsx
'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { METRIC_TYPE_OPTIONS } from '@/constants/constants';

interface MetricChartsProps {
  metrics: {
    metric_date: string;
    metric_type: string;
    metric_value: number;
  }[];
}

const MetricCharts: React.FC<MetricChartsProps> = ({ metrics }) => {
  const metricsByType = METRIC_TYPE_OPTIONS.filter(({ value }) => value !== '').map(({ value, label }) => ({
    metricType: value,
    metricUnit: label.match(/\(.*?\)/)?.[0] || '',
    data: metrics.filter((metric) => metric.metric_type === value),
  }));

  return (
    <div>
      {metricsByType.map(({ metricType, metricUnit, data }) => (
        <div key={metricType} className="my-8">
          <h2 className="text-2xl font-bold mb-4">{metricType} {metricUnit}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis 
                dataKey="metric_date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              
              <Line type="monotone" dataKey="metric_value" stroke="#8884d8" activeDot={{ r: 8 }} />
              <ReferenceLine y={100} label="Standard Value" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default MetricCharts;