'use client';
import { Suspense } from 'react';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { Drawer } from '@/components/ui/Drawer';
import { TeamForm } from '@/components/admin/TeamForm';

function TeamAdminContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-member' || action === 'edit';

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) {
      console.error('Failed to load team members', error);
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
      const res = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchItems();
      else alert(data.error || 'Failed to delete member');
    } catch (error) {
      console.error('Failed to delete member', error);
    }
  };

  const handleCloseDrawer = () => router.push('/dashboard/team');
  const handleSaved = () => { fetchItems(); handleCloseDrawer(); };

  const columns = [
    {
      key: 'image',
      label: 'Photo',
      render: (row: any) => (
        <img
          src={row.image || '/images/placeholder.jpg'}
          alt={row.name}
          className="w-12 h-12 object-cover rounded-full border-2 border-border"
        />
      )
    },
    { key: 'name', label: 'Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'email', label: 'Email' },
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
        title={action === 'edit' ? 'Edit Team Member' : 'Add Team Member'}
        width="max-w-2xl"
      >
        <TeamForm id={editId} onSuccess={handleSaved} onCancel={handleCloseDrawer} />
      </Drawer>
    </div>
  );
}


export default function TeamAdminPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <TeamAdminContent />
    </Suspense>
  );
}
