'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Save } from 'lucide-react';

interface CategoryFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CategoryForm({ id, onSuccess, onCancel }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'general',
  });

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const res = await fetch('/api/categories');
          const data = await res.json();
          if (data.success) {
            const cat = data.data.find((c: any) => c.id === id);
            if (cat) {
              setFormData({
                name: cat.name || '',
                slug: cat.slug || '',
                type: cat.type || 'general',
              });
            } else {
              setError('Category not found');
            }
          }
        } catch (err) {
          setError('Error loading category');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'name' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleSelectChange = (value: string, name?: string) => {
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('slug', formData.slug);
      submitData.append('type', formData.type);

      const url = id ? `/api/categories/${id}` : '/api/categories';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: submitData,
      });

      const data = await res.json();
      
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Failed to save category');
      }
    } catch (err) {
      setError('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex-1 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
      <div className="flex-1 p-6 md:p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Category Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Commercial Projects"
          />
          <Input
            label="URL Slug"
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g. commercial-projects"
          />
          <div className="flex flex-col gap-1.5">
            <Select
              label="Category Type"
              name="type"
              value={formData.type}
              onChange={handleSelectChange}
              options={[
                { label: 'General (Both)', value: 'general' },
                { label: 'Project Only', value: 'project' },
                { label: 'Gallery Only', value: 'gallery' },
              ]}
            />
            <p className="text-xs text-text-medium mt-1">Determine where this category will be available.</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-end gap-3 p-4 px-6 md:px-8 mt-auto">
        <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading} className="px-8 gap-2">
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Category'}
        </Button>
      </div>
    </form>
  );
}
