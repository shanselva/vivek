'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trash2, UploadCloud, Award, Building2, Plus, Image as ImageIcon } from 'lucide-react';

export default function ClientsAdminPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (data.success) {
        setClients(data.data);
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile) {
      alert('Please select a client logo image');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('name', name || 'Trusted Client');
      formData.append('logo', logoFile);
      formData.append('order', String(clients.length + 1));

      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        setName('');
        setLogoFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchClients();
      } else {
        alert(data.error || 'Failed to upload client logo');
      }
    } catch (err) {
      console.error('Error uploading client:', err);
      alert('An error occurred during upload');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this client logo?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchClients();
      } else {
        alert(data.error || 'Failed to delete client');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-6xl mx-auto">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
            <Award className="text-[#FFB800]" size={32} /> Trusted Clients &amp; Institutions Marquee
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Upload client logos to display them in the auto-scrolling horizontal marquee on the Homepage.
          </p>
        </div>
      </div>

      {}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Plus className="text-emerald-600" size={20} /> Add New Client Logo
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Client / Institution Name
            </label>
            <Input 
              type="text" 
              placeholder="e.g. NHAI / Tamil Nadu PWD / L&T" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Logo Image (PNG/JPEG)
            </label>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
          </div>

          <div className="flex gap-4 items-center">
            {previewUrl && (
              <div className="w-12 h-12 shrink-0 rounded-lg border border-slate-200 bg-slate-50 p-1 flex items-center justify-center overflow-hidden">
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <Button 
              type="submit" 
              disabled={submitting || !logoFile}
              className="w-full bg-[#0a42a8] text-white hover:bg-[#083382] font-bold py-2.5 h-auto flex items-center justify-center gap-2"
            >
              <UploadCloud size={18} /> {submitting ? 'Uploading...' : 'Upload Logo'}
            </Button>
          </div>
        </form>
      </div>

      {}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Building2 className="text-[#0a42a8]" size={20} /> Active Marquee Clients ({clients.length})
        </h2>

        {loading ? (
          <div className="py-12 text-center text-slate-500 font-medium">Loading uploaded clients...</div>
        ) : clients.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.map(client => (
              <div key={client.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center group relative">
                <div className="w-full h-20 flex items-center justify-center p-2">
                  <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain filter group-hover:scale-105 transition-transform" />
                </div>
                <div className="w-full pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 truncate max-w-[100px]" title={client.name}>
                    {client.name}
                  </span>
                  <button 
                    onClick={() => handleDelete(client.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                    title="Delete Client Logo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 space-y-3">
            <ImageIcon className="mx-auto text-slate-300" size={48} />
            <p className="font-semibold text-slate-700">No client logos uploaded yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Upload your trusted client logos above to display them live in the continuous marquee section on the Homepage!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
