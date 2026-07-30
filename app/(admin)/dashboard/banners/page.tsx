'use client';
import { Suspense } from 'react';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { Drawer } from '@/components/ui/Drawer';
import { BannerForm } from '@/components/admin/BannerForm';
import { Badge } from '@/components/ui/Badge';

function BannersContent() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-banner' || action === 'edit';

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      if (data.success) {
        setBanners(data.data);
      }
    } catch (error) {
      console.error('Failed to load banners', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [isDrawerOpen]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      if (data.success) {
        fetchBanners();
      } else {
        alert(data.error || 'Failed to delete banner');
      }
    } catch (error) {
      console.error('Failed to delete banner', error);
    }
  };

  const handleCloseDrawer = () => {
    router.push('/dashboard/banners');
  };

  const handleSaved = () => {
    fetchBanners();
    handleCloseDrawer();
  };

  const columns = [
    { 
      key: 'src', 
      label: 'Preview',
      render: (row: any) => (
        <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden relative">
          {row.type === 'video' ? (
            <video src={row.src} className="w-full h-full object-cover" muted />
          ) : (
            <img src={row.src} alt={row.heading1} className="w-full h-full object-cover" />
          )}
        </div>
      )
    },
    { key: 'heading1', label: 'Heading' },
    { key: 'location', label: 'Location' },
    { key: 'order', label: 'Sort Order' },
    { 
      key: 'isActive', 
      label: 'Status',
      render: (row: any) => (
        <Badge variant={row.isActive ? 'success' : 'error'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
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
          data={banners} 
          onDelete={handleDelete}
          getEditLink={(id) => `?action=edit&id=${id}`}
        />
      )}

      {}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        title={action === 'edit' ? "Edit Banner" : "Add New Banner"}
        width="max-w-md"
      >
        <BannerForm 
          id={editId}
          onSuccess={handleSaved} 
          onCancel={handleCloseDrawer} 
        />
      </Drawer>
    </div>
  );
}

export default function BannersPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <BannersContent />
    </Suspense>
  );
}
