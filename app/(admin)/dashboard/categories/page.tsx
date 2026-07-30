'use client';
import { Suspense } from 'react';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { Drawer } from '@/components/ui/Drawer';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { Badge } from '@/components/ui/Badge';
import { Plus, Tag } from 'lucide-react';
import Link from 'next/link';

function CategoriesContent() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-category' || action === 'edit';

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to load categories', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isDrawerOpen]);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      if (data.success) {
        fetchCategories();
      } else {
        alert(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };

  const handleCloseDrawer = () => {
    router.push('/dashboard/categories');
  };

  const handleSaved = () => {
    fetchCategories();
    handleCloseDrawer();
  };

  const columns = [
    { key: 'name', label: 'Category Name' },
    { key: 'slug', label: 'Slug' },
    { 
      key: 'type', 
      label: 'Available For',
      render: (row: any) => (
        <Badge variant={row.type === 'project' ? 'info' : row.type === 'gallery' ? 'warning' : 'success'}>
          {row.type === 'project' ? 'Projects Only' : row.type === 'gallery' ? 'Gallery Only' : 'General (Both)'}
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
          data={categories} 
          onDelete={handleDelete}
          getEditLink={(id) => `?action=edit&id=${id}`}
        />
      )}

      {}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        title={action === 'edit' ? "Edit Category" : "Add New Category"}
        width="max-w-md"
      >
        <CategoryForm 
          id={editId}
          onSuccess={handleSaved} 
          onCancel={handleCloseDrawer} 
        />
      </Drawer>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <CategoriesContent />
    </Suspense>
  );
}
