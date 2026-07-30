'use client';
import { Suspense } from 'react';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

function ProjectsContent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const action = searchParams.get('action');
  const editId = searchParams.get('id');
  const isDrawerOpen = action === 'add-project' || action === 'edit';

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Failed to load projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      if (data.success) {
        fetchProjects(); 
      } else {
        alert(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  const handleCloseDrawer = () => {
    router.replace('/dashboard/projects');
  };

  const handleProjectCreated = () => {
    fetchProjects();
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
          {!projects || projects.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg border border-border p-12 text-center text-text-light flex flex-col items-center">
              <ImageIcon size={48} className="text-slate-200 mb-4" />
              <p className="text-lg font-medium text-slate-400">No projects found.</p>
              <p className="text-sm mt-1">Click "Add Project" to create your first project.</p>
            </div>
          ) : (
            projects.map((project: any) => (
              <div key={project.id} className="bg-white rounded-xl border border-border flex flex-row items-center p-3 shadow-sm hover:shadow-md transition-all group gap-4">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-slate-100 relative overflow-hidden shrink-0">
                   {project.coverImage || (project.images && project.images.length > 0) ? (
                     <img src={project.coverImage || project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-300">
                       <ImageIcon size={28} />
                     </div>
                   )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center min-w-0 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base md:text-lg font-bold text-text-dark truncate pr-2">{project.title}</h3>
                    <div className="flex gap-1 shrink-0 -mt-1 -mr-1">
                      <Link 
                        href={`?action=edit&id=${project.id}`}
                        className="p-1.5 text-text-medium hover:text-primary transition-colors rounded-md hover:bg-primary/10"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 text-text-medium hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-text-medium font-medium mb-3 truncate">{project.category}</p>
                  
                  <div className="flex gap-2 mt-auto">
                     <Badge variant={project.status === 'completed' ? 'success' : 'info'} className="text-[10px] md:text-xs px-2 py-0.5 shadow-sm">
                       {project.status}
                     </Badge>
                     {project.featured && (
                       <Badge variant="warning" className="text-[10px] md:text-xs px-2 py-0.5 shadow-sm">Featured</Badge>
                     )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        title={action === 'edit' ? "Edit Project" : "Add New Project"}
        width="max-w-2xl"
      >
        <ProjectForm 
          id={editId}
          onSuccess={handleProjectCreated} 
          onCancel={handleCloseDrawer} 
        />
      </Drawer>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <ProjectsContent />
    </Suspense>
  );
}
