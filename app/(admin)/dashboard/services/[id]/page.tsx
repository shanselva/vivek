'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [serviceId, setServiceId] = useState<string>('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDesc: '',
    icon: 'HardHat',
    order: 0,
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const resolvedParams = await params;
        setServiceId(resolvedParams.id);
        
        const res = await fetch(`/api/services/${resolvedParams.id}`);
        const data = await res.json();
        
        if (data.success && data.data) {
          const service = data.data;
          setFormData({
            title: service.title,
            slug: service.slug,
            description: service.description,
            shortDesc: service.shortDesc || '',
            icon: service.icon || 'HardHat',
            order: service.order || 0,
          });
        } else {
          setError('Failed to load service details.');
        }
      } catch (err) {
        setError('Failed to load service details.');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'order' ? parseInt(value) || 0 : value 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
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
        setError(data.error || 'Failed to update service');
      }
    } catch (err) {
      setError('An error occurred while updating the service.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/services" className="p-2 hover:bg-border rounded-full transition-colors">
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
            />
            <Input
              label="URL Slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
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
                <option value="HardHat">Hard Hat</option>
                <option value="Building2">Building</option>
                <option value="Home">Home</option>
                <option value="Wrench">Wrench</option>
                <option value="Hammer">Hammer</option>
              </select>
            </div>
            <Input
              label="Display Order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-medium">Short Description</label>
            <textarea
              name="shortDesc"
              rows={2}
              value={formData.shortDesc}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
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
            ></textarea>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <Link href="/dashboard/services">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
