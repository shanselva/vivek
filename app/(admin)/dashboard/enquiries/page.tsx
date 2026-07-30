'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/enquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (error) {
      console.error('Failed to load enquiries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await res.json();
      if (data.success) {
        fetchEnquiries();
      } else {
        alert(data.error || 'Failed to delete enquiry');
      }
    } catch (error) {
      console.error('Failed to delete enquiry', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await res.json();
      if (data.success) {
        fetchEnquiries();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'service', label: 'Service' },
    { 
      key: 'message', 
      label: 'Message',
      render: (row: any) => (
        <span className="truncate block max-w-[200px]" title={row.message}>
          {row.message}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row: any) => (
        <select 
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`text-xs font-bold rounded-full px-2 py-1 border-none focus:ring-2 focus:ring-primary/50 cursor-pointer ${
            row.status === 'new' ? 'bg-red-100 text-red-800' :
            row.status === 'replied' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}
        >
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
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
          data={enquiries} 
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
