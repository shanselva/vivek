'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDesc: '',
    icon: 'HardHat',
    order: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({ 
      ...formData, 
      [name]: name === 'order' ? parseInt(value) || 0 : value 
    });

    
    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push('/dashboard/services'); 
      } else {
        setError(data.error || 'Failed to create service');
      }
    } catch (err) {
      setError('An error occurred while creating the service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="p-2 hover:bg-border rounded-full transition-colors">
          <ArrowLeft size={20} className="text-text-medium" />
        </Link>
        
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Service Title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Commercial Construction"
            />
            <Input
              label="URL Slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. commercial-construction"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-text-medium">Icon Identifier</label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="HardHat">Hard Hat (Default)</option>
                <option value="Building2">Building</option>
                <option value="Home">Home</option>
                <option value="Wrench">Wrench</option>
                <option value="Hammer">Hammer</option>
              </select>
            </div>
            <Input
              label="Display Order (lowest first)"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-medium">Short Description (for cards)</label>
            <textarea
              name="shortDesc"
              rows={2}
              value={formData.shortDesc}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              placeholder="Brief summary for service cards..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-medium">Full Description</label>
            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              placeholder="Detailed description of the service..."
            ></textarea>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <Link href="/dashboard">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
