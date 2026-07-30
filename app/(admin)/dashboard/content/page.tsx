'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContentAdminPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/content', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error('Failed to load content', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleUpdate = async (item: any) => {
    setSaving(item.id);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item),
      });
      
      const data = await res.json();
      if (!data.success) {
        alert(data.error || 'Failed to update content');
      }
    } catch (error) {
      console.error('Failed to update content', error);
      alert('Failed to update content');
    } finally {
      setSaving(null);
    }
  };

  const handleValueChange = (id: string, newValue: string) => {
    setContent(content.map(c => c.id === id ? { ...c, value: newValue } : c));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Site Content</h1>
        <p className="text-text-medium mt-1">Manage static text blocks across the website.</p>
        <p className="text-sm text-secondary mt-2">To use this fully, ensure the `site_content` table is populated via prisma seed.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : content.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.map((item) => (
            <Card key={item.id} className="flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-1 block">
                  {item.page} &rsaquo; {item.section}
                </span>
                <label className="text-sm font-medium text-text-dark">{item.key}</label>
              </div>
              <textarea
                value={item.value}
                onChange={(e) => handleValueChange(item.id, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={() => handleUpdate(item)}
                  disabled={saving === item.id}
                >
                  {saving === item.id ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8 text-text-medium">
            No content blocks found. Please run `npx prisma db seed` to insert default content blocks.
          </div>
        </Card>
      )}
    </div>
  );
}
