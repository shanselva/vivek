'use client';

import React from 'react';
import { User, Plus, Menu } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function TopBar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const getPageInfo = () => {
    if (!pathname) return { title: 'Dashboard', desc: '' };
    if (pathname === '/dashboard') return { title: 'Overview', desc: 'Welcome back to your dashboard.' };
    
    
    if (pathname.includes('/projects/create')) return { title: 'Add Project', desc: 'Create a new construction project.' };
    if (pathname.includes('/projects/')) return { title: 'Edit Project', desc: 'Update project details.' };
    if (pathname.includes('/projects')) return { title: 'Projects', desc: 'Manage your construction projects portfolio.', action: { label: 'Add Project', href: '?action=add-project' } };
    
    if (pathname.includes('/services/create')) return { title: 'Add Service', desc: 'Create a new service offering.' };
    if (pathname.includes('/services/')) return { title: 'Edit Service', desc: 'Update service details.' };
    if (pathname.includes('/services')) return { title: 'Services', desc: 'Manage the services you offer.', action: { label: 'Add Service', href: '?action=add-service' } };
    
    if (pathname.includes('/banners')) return { title: 'Banners', desc: 'Manage the hero section banners on the landing page.', action: { label: 'Add Banner', href: '?action=add-banner' } };
    
    if (pathname.includes('/gallery')) return { title: 'Gallery', desc: 'Manage your image gallery.', action: { label: 'Add Image', href: '?action=add-image' } };
    if (pathname.includes('/categories')) return { title: 'Categories', desc: 'Manage options for project and gallery types.', action: { label: 'Add Category', href: '?action=add-category' } };
    if (pathname.includes('/testimonials')) return { title: 'Testimonials', desc: 'Manage client testimonials.', action: { label: 'Add Testimonial', href: '?action=add-testimonial' } };
    if (pathname.includes('/team')) return { title: 'Team', desc: 'Manage your team members.', action: { label: 'Add Member', href: '?action=add-member' } };
    if (pathname.includes('/careers')) return { title: 'Careers', desc: 'Manage job postings and career opportunities.', action: { label: 'Add Job', href: '?action=add-job' } };
    if (pathname.includes('/enquiries')) return { title: 'Enquiries', desc: 'Manage customer enquiries.' };
    if (pathname.includes('/settings')) return { title: 'Settings', desc: 'Manage your website settings.' };
    
    return { title: 'Dashboard', desc: '' };
  };

  const { title, desc, action } = getPageInfo() as any;

  return (
    <header className="h-20 bg-white border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-text-medium hover:bg-surface rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-text-dark leading-tight">{title}</h2>
          {desc && <p className="text-[10px] md:text-xs text-text-medium mt-0.5 hidden sm:block">{desc}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {action && (
          <Link href={action.href} className="mr-4">
            <Button className="gap-2 shadow-sm hover:-translate-y-0.5 transition-all">
              <Plus size={18} />
              {action.label}
            </Button>
          </Link>
        )}
        
        <div className="hidden sm:flex items-center gap-2 text-text-medium bg-surface px-4 py-2 rounded-full">
          <User size={18} />
          <span className="text-sm font-bold">Administrator</span>
        </div>
      </div>
    </header>
  );
}
