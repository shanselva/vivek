'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { HardHat, Wrench, MessageSquare, Mail } from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    testimonials: 0,
    enquiries: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        const res = await fetch('/api/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to load stats', error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: HardHat, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Services Offered', value: stats.services, icon: Wrench, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'New Enquiries', value: stats.enquiries, icon: Mail, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-6">
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="flex items-center gap-4">
              <div className={`p-4 rounded-lg ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-text-dark">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <Card>
          <h3 className="text-lg font-bold text-text-dark mb-4">Recent Activity</h3>
          <p className="text-text-medium">Dashboard charts and activity logs will appear here.</p>
        </Card>
      </div>
    </div>
  );
}