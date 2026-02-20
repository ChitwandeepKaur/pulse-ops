'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface MetricChartProps {
  data: any[];
  isLoading?: boolean;
}

export function MetricChart({ data, isLoading }: MetricChartProps) {
  if (isLoading) {
    return (
        <div className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="card h-100 shadow-sm border-0">
        <div className="card-body">
            <h5 className="card-title fw-bold mb-4">Traffic Overview</h5>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#6c757d', fontSize: 12 }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#6c757d', fontSize: 12 }} 
                        />
                        <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" fill="#0d6efd" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
}
