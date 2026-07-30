'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    
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
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: [], 
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push('/dashboard/projects');
      } else {
        setError(data.error || 'Failed to create project');
      }
    } catch (err) {
      setError('An error occurred while creating the project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden p-0 border-none shadow-md">
        {}
        <div className="bg-slate-50 border-b border-border px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard/projects" className="p-2 bg-white hover:bg-slate-100 rounded-md border border-border shadow-sm transition-all">
            <ArrowLeft size={16} className="text-text-medium" />
          </Link>
          <div>
            <h3 className="text-lg font-bold text-text-dark">Project Details</h3>
            <p className="text-xs text-text-medium">Fill in the information below to add a new project.</p>
          </div>
        </div>

        {}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <Input
                  label="Project Title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Skyline Tower"
                />
                <Input
                  label="URL Slug"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g. skyline-tower"
                />
              </div>
            </div>

            {}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Classification</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-dark">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-dark">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Additional Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. New York, NY"
                />
                <Input
                  label="Client Name"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-sm font-semibold text-text-dark">Project Description</label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
                  placeholder="Write a detailed description of the project..."
                ></textarea>
              </div>
            </div>

            {}
            <div className="bg-slate-50 p-4 rounded-lg border border-border flex items-start gap-3">
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary/50 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="featured" className="text-sm font-bold text-text-dark cursor-pointer block">
                  Feature this project on the homepage
                </label>
                <p className="text-xs text-text-medium mt-0.5">Featured projects appear prominently in the main portfolio section.</p>
              </div>
            </div>

            {}
            <div className="pt-6 border-t border-border flex justify-end gap-3">
              <Link href="/dashboard/projects">
                <Button type="button" variant="outline" className="px-6">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading} className="px-8 gap-2">
                <Save size={16} />
                {loading ? 'Creating...' : 'Save Project'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
