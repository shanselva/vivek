'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Save, Upload } from 'lucide-react';

interface BannerFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function BannerForm({ id, onSuccess, onCancel }: BannerFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    type: 'image',
    heading1: '',
    heading2: '',
    eyebrow: '',
    location: '',
    subtitle: '',
    order: '0',
    isActive: 'true',
    srcUrl: '',
  });

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      const fetchBanner = async () => {
        try {
          const res = await fetch('/api/banners');
          const data = await res.json();
          if (data.success) {
            const banner = data.data.find((b: any) => b.id === id);
            if (banner) {
              setFormData({
                type: banner.type || 'image',
                heading1: banner.heading1 || '',
                heading2: banner.heading2 || '',
                eyebrow: banner.eyebrow || '',
                location: banner.location || '',
                subtitle: banner.subtitle || '',
                order: banner.order?.toString() || '0',
                isActive: banner.isActive ? 'true' : 'false',
                srcUrl: banner.src || '',
              });
            } else {
              setError('Banner not found');
            }
          }
        } catch (err) {
          setError('Error loading banner');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchBanner();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string, name?: string) => {
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      
      const submitData = new FormData();
      submitData.append('type', formData.type);
      submitData.append('heading1', formData.heading1);
      submitData.append('heading2', formData.heading2);
      submitData.append('eyebrow', formData.eyebrow);
      submitData.append('location', formData.location);
      submitData.append('subtitle', formData.subtitle);
      submitData.append('order', formData.order);
      submitData.append('isActive', formData.isActive);
      
      if (mediaFile) {
        submitData.append('media', mediaFile);
      } else if (formData.srcUrl) {
        submitData.append('srcUrl', formData.srcUrl);
      }

      const url = id ? `/api/banners/${id}` : '/api/banners';
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
        setError(data.error || 'Failed to save banner');
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
      <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Select
            label="Banner Type"
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            options={[
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
            ]}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Media</label>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload size={16} className="mr-2" /> Select File
              </Button>
              <span className="text-sm text-gray-500">
                {mediaFile ? mediaFile.name : (formData.srcUrl ? 'Existing media selected' : 'No file selected')}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={formData.type === 'video' ? 'video/mp4,video/webm' : 'image/jpeg,image/png,image/webp'}
                onChange={handleFileChange}
              />
            </div>
            {!mediaFile && !formData.srcUrl && !id && (
              <p className="text-xs text-red-500 mt-1">Media is required for new banners</p>
            )}
          </div>

          <Input
            label="Heading Line 1"
            name="heading1"
            required
            value={formData.heading1}
            onChange={handleChange}
            placeholder="e.g. Commercial cum Office"
          />
          <Input
            label="Heading Line 2"
            name="heading2"
            value={formData.heading2}
            onChange={handleChange}
            placeholder="e.g. Complex, Virugambakkam"
          />
          <Input
            label="Eyebrow Text (Optional)"
            name="eyebrow"
            value={formData.eyebrow}
            onChange={handleChange}
            placeholder="e.g. 18+ Years of Proven Excellence"
          />
          <Input
            label="Location (Badge)"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Chennai"
          />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Subtitle Description</label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="e.g. A landmark commercial complex..."
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sort Order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
            />
            <Select
              label="Status"
              name="isActive"
              value={formData.isActive}
              onChange={handleSelectChange}
              options={[
                { label: 'Active', value: 'true' },
                { label: 'Inactive', value: 'false' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-end gap-3 p-4 px-6 md:px-8 mt-auto">
        <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading} className="px-8 gap-2">
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Banner'}
        </Button>
      </div>
    </form>
  );
}
