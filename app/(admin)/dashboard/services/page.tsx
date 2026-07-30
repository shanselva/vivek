'use client';
import { Suspense } from 'react';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Drawer } from '@/components/ui/Drawer';
import { ServiceForm } from '@/components/admin/ServiceForm';
import { Edit, Trash2, Wrench, Activity, Briefcase, Factory, GraduationCap, Hammer, Box, Home, Map as MapIcon, Waves, MapPin, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const iconMap: Record<string, any> = {
  Activity, Briefcase, Factory, GraduationCap, Hammer, Box, Home, Map: MapIcon, Waves, MapPin, Leaf
};

const colorThemes = [
  "bg-blue-50 text-blue-600 border-blue-200",
  "bg-emerald-50 text-emerald-600 border-emerald-200",
  "bg-amber-50 text-amber-600 border-amber-200",
  "bg-purple-50 text-purple-600 border-purple-200",
  "bg-rose-50 text-rose-600 border-rose-200",
  "bg-indigo-50 text-indigo-600 border-indigo-200",
  "bg-cyan-50 text-cyan-600 border-cyan-200",
  "bg-orange-50 text-orange-600 border-orange-200",
];
import Link from 'next/link';

function ServicesContent() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-service' || action === 'edit';

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Failed to load services', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [isDrawerOpen]); 

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      if (data.success) {
        fetchServices(); 
      } else {
        alert(data.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Failed to delete service', error);
    }
  };

  const handleCloseDrawer = () => {
    router.push('/dashboard/services');
  };

  const handleServiceSaved = () => {
    fetchServices();
    handleCloseDrawer();
  };


  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {!services || services.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg border border-border p-12 text-center text-text-light flex flex-col items-center">
              <Wrench size={48} className="text-slate-200 mb-4" />
              <p className="text-lg font-medium text-slate-400">No services found.</p>
              <p className="text-sm mt-1">Click "Add Service" to create your first service.</p>
            </div>
          ) : (
            services.map((service: any, index: number) => {
              const IconComponent = iconMap[service.icon] || Wrench;
              const theme = colorThemes[index % colorThemes.length];
              
              return (
              <div key={service.id} className="bg-white rounded-xl border border-border flex flex-row items-center p-3 shadow-sm hover:shadow-md transition-all group gap-4">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-lg flex flex-col items-center justify-center shrink-0 border ${theme} transition-transform group-hover:scale-105`}>
                  <IconComponent size={28} strokeWidth={1.5} className="mb-1" />
                  <span className="text-[9px] font-bold uppercase tracking-wider truncate w-full px-1 text-center opacity-80">{service.icon}</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-center min-w-0 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base md:text-lg font-bold text-text-dark truncate pr-2">{service.title}</h3>
                    <div className="flex gap-1 shrink-0 -mt-1 -mr-1">
                      <Link 
                        href={`?action=edit&id=${service.id}`}
                        className="p-1.5 text-text-medium hover:text-primary transition-colors rounded-md hover:bg-primary/10"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-1.5 text-text-medium hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-text-medium font-medium mb-3 truncate">{service.shortDesc || `Slug: ${service.slug}`}</p>
                  
                  <div className="flex gap-2 mt-auto">
                     <Badge variant="default" className="text-[10px] md:text-xs px-2 py-0.5 shadow-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
                       Order: {service.order}
                     </Badge>
                  </div>
                </div>
              </div>
            )})
          )}
        </div>
      )}

      {}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        title={action === 'edit' ? "Edit Service" : "Add New Service"}
        width="max-w-2xl"
      >
        <ServiceForm 
          id={editId}
          onSuccess={handleServiceSaved} 
          onCancel={handleCloseDrawer} 
        />
      </Drawer>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <ServicesContent />
    </Suspense>
  );
}
