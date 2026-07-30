'use client';
import { Suspense } from 'react';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { TestimonialForm } from '@/components/admin/TestimonialForm';

function TestimonialsAdminContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-testimonial' || action === 'edit';

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) {
      console.error('Failed to load testimonials', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [isDrawerOpen]);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchItems();
      else alert(data.error || 'Failed to delete testimonial');
    } catch (error) {
      console.error('Failed to delete testimonial', error);
    }
  };

  const handleCloseDrawer = () => router.push('/dashboard/testimonials');
  const handleSaved = () => { fetchItems(); handleCloseDrawer(); };

  const columns = [
    { key: 'name', label: 'Client Name' },
    { key: 'company', label: 'Company' },
    {
      key: 'rating',
      label: 'Rating',
      render: (row: any) => (
        <span className="flex items-center gap-1 text-yellow-500 font-bold">
          ★ {row.rating}/5
        </span>
      )
    },
    {
      key: 'active',
      label: 'Status',
      render: (row: any) => (
        <Badge variant={row.active ? 'success' : 'default'}>{row.active ? 'Visible' : 'Hidden'}</Badge>
      )
    },
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
        title={action === 'edit' ? 'Edit Testimonial' : 'Add Testimonial'}
        width="max-w-2xl"
      >
        <TestimonialForm id={editId} onSuccess={handleSaved} onCancel={handleCloseDrawer} />
      </Drawer>
    </div>
  );
}

export default function TestimonialsAdminPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <TestimonialsAdminContent />
    </Suspense>
  );
}
