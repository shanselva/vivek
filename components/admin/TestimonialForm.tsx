'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Save, Star } from 'lucide-react';

interface TestimonialFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TestimonialForm({ id, onSuccess, onCancel }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    designation: '',
    quote: '',
    rating: 5,
    active: true,
  });

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const res = await fetch(`/api/testimonials/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            const t = data.data;
            setFormData({
              name: t.name || '',
              company: t.company || '',
              designation: t.designation || '',
              quote: t.quote || '',
              rating: t.rating || 5,
              active: t.active !== undefined ? t.active : true,
            });
          } else {
            setError(data.error || 'Failed to load testimonial');
          }
        } catch {
          setError('Error loading testimonial');
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
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: name === 'rating' ? parseInt(value) || 5 : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = id ? `/api/testimonials/${id}` : '/api/testimonials';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Failed to save testimonial');
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
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Client Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <Input label="Client Name" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. John Smith" />
            <Input label="Company" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. ABC Corp" />
          </div>
          <Input label="Designation / Role" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. CEO" />
        </div>

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Review</h4>
          <div className="flex flex-col gap-1.5 pt-2">
            <label className="text-sm font-semibold text-text-dark">Testimonial Quote</label>
            <textarea
              name="quote"
              required
              rows={5}
              value={formData.quote}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="Write the client's testimonial here..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-dark flex items-center gap-2">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              Rating ({formData.rating} / 5)
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`w-10 h-10 rounded-full border-2 text-sm font-bold transition-all ${formData.rating >= star ? 'bg-yellow-500 border-yellow-500 text-white' : 'border-border text-text-medium hover:border-yellow-400'}`}
                >
                  {star}
                </button>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="bg-slate-50 p-4 rounded-lg border border-border flex items-start gap-3">
          <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleChange}
            className="w-5 h-5 text-primary rounded border-gray-300 mt-0.5 cursor-pointer" />
          <div>
            <label htmlFor="active" className="text-sm font-bold text-text-dark cursor-pointer block">Show on website</label>
            <p className="text-xs text-text-medium mt-0.5">Only visible testimonials are displayed on the public website.</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-end gap-3 p-4 px-6 md:px-8">
        <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading} className="px-8 gap-2">
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Testimonial'}
        </Button>
      </div>
    </form>
  );
}
