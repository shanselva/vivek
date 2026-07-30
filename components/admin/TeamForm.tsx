'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Save, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

interface TeamFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TeamForm({ id, onSuccess, onCancel }: TeamFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    bio: '',
    order: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const res = await fetch(`/api/team/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            const m = data.data;
            setFormData({
              name: m.name || '',
              designation: m.designation || '',
              email: m.email || '',
              phone: m.phone || '',
              bio: m.bio || '',
              order: m.order || 0,
            });
            if (m.image) setImagePreview(m.image);
          } else {
            setError(data.error || 'Failed to load team member');
          }
        } catch {
          setError('Error loading team member');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'order' ? parseInt(value) || 0 : value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, val]) => submitData.append(key, String(val)));
      if (imageFile) submitData.append('image', imageFile);

      const url = id ? `/api/team/${id}` : '/api/team';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: submitData,
      });

      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Failed to save team member');
      }
    } catch {
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
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
        )}

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Profile Photo</h4>
          <div className="pt-2 flex gap-6 items-start">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer group flex-shrink-0"
            >
              {imagePreview ? (
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-border shadow-sm group-hover:border-primary transition-colors">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={(e) => { e.stopPropagation(); clearImage(); }}
                      className="bg-red-500 text-white p-1.5 rounded-full">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-border bg-slate-50 flex flex-col items-center justify-center group-hover:border-primary group-hover:bg-slate-100 transition-all">
                  <UploadCloud size={24} className="text-text-medium group-hover:text-primary transition-colors" />
                  <span className="text-xs text-text-medium mt-1">Upload</span>
                </div>
              )}
            </div>
            <div className="text-sm text-text-medium pt-2">
              <p className="font-semibold text-text-dark">Profile Photo</p>
              <p className="mt-1">Upload a professional headshot.</p>
              <p className="mt-1 text-xs">PNG, JPG, WEBP. Max 5MB.</p>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <Input label="Full Name" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Rajesh Kumar" />
            <Input label="Designation / Role" name="designation" required value={formData.designation} onChange={handleChange} placeholder="e.g. Senior Engineer" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. rajesh@company.in" />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
          </div>
          <Input label="Display Order (lowest first)" name="order" type="number" value={formData.order} onChange={handleChange} />
        </div>

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Biography</h4>
          <div className="flex flex-col gap-1.5 pt-2">
            <label className="text-sm font-semibold text-text-dark">Short Bio</label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="Brief bio about this team member..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-end gap-3 p-4 px-6 md:px-8">
        <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading} className="px-8 gap-2">
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Member'}
        </Button>
      </div>
    </form>
  );
}
