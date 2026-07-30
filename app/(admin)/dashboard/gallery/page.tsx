'use client';
import { Suspense } from 'react';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { GalleryForm } from '@/components/admin/GalleryForm';

function GalleryAdminContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-image' || action === 'edit';

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) {
      console.error('Failed to load gallery items', error);
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
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchItems();
      else alert(data.error || 'Failed to delete item');
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  const handleCloseDrawer = () => router.push('/dashboard/gallery');
  const handleSaved = () => { fetchItems(); handleCloseDrawer(); };

  const columns = [
    {
      key: 'url',
      label: 'Image',
      render: (row: any) => {
        const getYoutubeVideoId = (url: string) => {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          const match = url.match(regExp);
          return (match && match[2].length === 11) ? match[2] : null;
        };
        const videoId = row.youtubeUrl ? getYoutubeVideoId(row.youtubeUrl) : null;
        const src = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : row.url;
        return (
          <img src={src} alt={row.caption || 'Image'} className="w-16 h-16 object-cover rounded-lg border border-border" />
        );
      }
    },
    { key: 'caption', label: 'Caption' },
    { key: 'category', label: 'Category' },
    {
      key: 'featured',
      label: 'Featured',
      render: (row: any) => (
        <Badge variant={row.featured ? 'warning' : 'default'}>{row.featured ? 'Yes' : 'No'}</Badge>
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
        title={action === 'edit' ? 'Edit Image' : 'Add Gallery Image'}
        width="max-w-2xl"
      >
        <GalleryForm id={editId} onSuccess={handleSaved} onCancel={handleCloseDrawer} />
      </Drawer>
    </div>
  );
}


export default function GalleryAdminPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <GalleryAdminContent />
    </Suspense>
  );
}
