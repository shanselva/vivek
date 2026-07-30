'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      } else {
        
        setSettings({
          companyName: 'VIVEK VIJAY AND COMPANY',
          email: 'info@vivekvijay.in',
          phone: '+1 555 123 4567',
          address: '123 Construction Blvd, NY',
          facebook: '',
          instagram: '',
          linkedin: '',
          seoTitle: 'VIVEK VIJAY AND COMPANY - Engineering Contractors',
          seoDesc: 'Leading construction company.',
        });
      }
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings),
      });
      
      const data = await res.json();
      if (data.success) {
        alert('Settings saved successfully!');
      } else {
        alert(data.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Failed to update settings', error);
      alert('Failed to update settings');
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
    <div className="space-y-6 max-w-4xl">
      

      <Card>
        <div className="space-y-6">
          <h3 className="text-lg font-bold border-b border-border pb-2">Company Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Company Name" name="companyName" value={settings.companyName || ''} onChange={handleChange} />
            <Input label="Email Address" name="email" value={settings.email || ''} onChange={handleChange} />
            <Input label="Phone Number" name="phone" value={settings.phone || ''} onChange={handleChange} />
            <Input label="Physical Address" name="address" value={settings.address || ''} onChange={handleChange} />
          </div>

          <h3 className="text-lg font-bold border-b border-border pb-2 pt-4">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Facebook URL" name="facebook" value={settings.facebook || ''} onChange={handleChange} placeholder="https://facebook.in/..." />
            <Input label="Instagram URL" name="instagram" value={settings.instagram || ''} onChange={handleChange} placeholder="https://instagram.in/..." />
            <Input label="LinkedIn URL" name="linkedin" value={settings.linkedin || ''} onChange={handleChange} placeholder="https://linkedin.in/..." />
          </div>

          <h3 className="text-lg font-bold border-b border-border pb-2 pt-4">Default SEO</h3>
          <div className="grid grid-cols-1 gap-6">
            <Input label="Site Meta Title" name="seoTitle" value={settings.seoTitle || ''} onChange={handleChange} />
            <Input label="Site Meta Description" name="seoDesc" value={settings.seoDesc || ''} onChange={handleChange} />
          </div>

          <div className="pt-6 border-t border-border flex justify-end">
            <Button onClick={handleUpdate} disabled={saving} size="lg">
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
