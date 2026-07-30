'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [projectId, setProjectId] = useState<string>('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'Commercial',
    status: 'ongoing',
    featured: false,
    location: '',
    client: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const resolvedParams = await params;
        setProjectId(resolvedParams.id);
        
        const res = await fetch(`/api/projects/${resolvedParams.id}`);
        const data = await res.json();
        
        if (data.success && data.data) {
          const project = data.data;
          setFormData({
            title: project.title,
            slug: project.slug,
            description: project.description,
            category: project.category,
            status: project.status,
            featured: project.featured,
            location: project.location || '',
            client: project.client || '',
          });
        } else {
          setError('Failed to load project details.');
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push('/dashboard/projects');
      } else {
        setError(data.error || 'Failed to update project');
      }
    } catch (err) {
      setError('An error occurred while updating the project.');
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
        <Link href="/dashboard/projects" className="p-2 hover:bg-border rounded-full transition-colors">
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
              label="Project Title"
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
              <label className="text-sm font-medium text-text-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Industrial">Industrial</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-text-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <Input
              label="Client"
              name="client"
              value={formData.client}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-medium">Description</label>
            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
            ></textarea>
          </div>

          <div className="flex items-center gap-3 py-2 border-t border-border mt-4">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded focus:ring-primary/50"
            />
            <label htmlFor="featured" className="text-sm font-medium text-text-dark cursor-pointer">
              Feature this project on the homepage
            </label>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <Link href="/dashboard/projects">
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
