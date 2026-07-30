'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';

interface CareerFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CareerForm({ id, onSuccess, onCancel }: CareerFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    department: 'Civil Engineering',
    location: 'Erode HQ',
    type: 'Full-Time',
    experience: '2-5 Years',
    salary: 'As per industry standards',
    description: '',
    requirements: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const res = await fetch(`/api/careers/${id}`);
          const data = await res.json();
          if (data.success) {
            const c = data.data;
            setFormData({
              title: c.title || '',
              department: c.department || 'Civil Engineering',
              location: c.location || 'Erode HQ',
              type: c.type || 'Full-Time',
              experience: c.experience || '',
              salary: c.salary || '',
              description: c.description || '',
              requirements: c.requirements || '',
              isActive: c.isActive !== undefined ? c.isActive : true,
              order: c.order || 0,
            });
          } else {
            setError(data.error || 'Failed to load career posting');
          }
        } catch {
          setError('Error loading career posting');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: name === 'order' ? parseInt(value) || 0 : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = id ? `/api/careers/${id}` : '/api/careers';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Failed to save career posting');
      }
    } catch {
      setError('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex-1 flex justify-center items-center h-full py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
        )}

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Job Overview</h4>
          
          <Input label="Job Title / Role" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Senior Site Engineer" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-dark">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Site Supervision">Site Supervision</option>
                <option value="Project Management">Project Management</option>
                <option value="Architecture & Design">Architecture &amp; Design</option>
                <option value="Administration & HR">Administration &amp; HR</option>
                <option value="Finance & Accounts">Finance &amp; Accounts</option>
              </select>
            </div>

            <Input label="Location" name="location" required value={formData.location} onChange={handleChange} placeholder="e.g. Erode HQ / Chennai Site" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-dark">Employment Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <Input label="Experience Level" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 3-5 Years / Fresher" />
            <Input label="Salary Package" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. ₹35,000 - ₹50,000 / month" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Detailed Description</h4>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-text-dark">Job Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="Provide a comprehensive summary of responsibilities and daily duties..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-text-dark">Requirements &amp; Qualifications</label>
            <textarea
              name="requirements"
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="List degrees, certifications, software skills (AutoCAD, Revit), etc."
            ></textarea>
            <span className="text-xs text-text-medium">Tip: Use bullet points or separate lines for clear reading.</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <Input label="Display Order (lowest first)" name="order" type="number" value={formData.order} onChange={handleChange} />
            
            <label className="flex items-center gap-3 cursor-pointer mt-6">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-semibold text-text-dark">Active Job Posting (Visible on Website)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-end gap-3 p-4 px-6 md:px-8">
        <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading} className="px-8 gap-2">
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Job Posting'}
        </Button>
      </div>
    </form>
  );
}
