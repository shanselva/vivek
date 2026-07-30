'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { Drawer } from '@/components/ui/Drawer';
import { CareerForm } from '@/components/admin/CareerForm';
import { Briefcase, CheckCircle2, XCircle } from 'lucide-react';

function CareersAdminContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-job' || action === 'edit';

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/careers');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) {
      console.error('Failed to load career postings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [isDrawerOpen]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      const res = await fetch(`/api/careers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchItems();
      else alert(data.error || 'Failed to delete job posting');
    } catch (error) {
      console.error('Failed to delete job posting', error);
    }
  };

  const handleCloseDrawer = () => router.push('/dashboard/careers');
  const handleSaved = () => { fetchItems(); handleCloseDrawer(); };

  const columns = [
    {
      key: 'title',
      label: 'Job Title',
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">
            <Briefcase size={18} />
          </div>
          <div>
            <p className="font-bold text-text-dark">{row.title}</p>
            <p className="text-xs text-text-medium">{row.department}</p>
          </div>
        </div>
      )
    },
    { key: 'location', label: 'Location' },
    { key: 'type', label: 'Type' },
    { key: 'experience', label: 'Experience' },
    {
      key: 'isActive',
      label: 'Status',
      render: (row: any) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          row.isActive !== false ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
        }`}>
          {row.isActive !== false ? <CheckCircle2 size={12} className="text-green-600" /> : <XCircle size={12} className="text-slate-400" />}
          {row.isActive !== false ? 'Active' : 'Draft / Hidden'}
        </span>
      )
    },
    { key: 'order', label: 'Order' },
  ];

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={items}
          onDelete={handleDelete}
          getEditLink={(id) => `?action=edit&id=${id}`}
        />
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title={action === 'edit' ? 'Edit Job Posting' : 'Post New Career Opportunity'}
        width="max-w-3xl"
      >
        <CareerForm id={editId} onSuccess={handleSaved} onCancel={handleCloseDrawer} />
      </Drawer>
    </div>
  );
}

export default function CareersAdminPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <CareersAdminContent />
    </Suspense>
  );
}
