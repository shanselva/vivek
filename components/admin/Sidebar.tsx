'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  HardHat, 
  Wrench, 
  Image as ImageIcon, 
  MessageSquare, 
  Users, 
  Mail,
  Tag,
  Settings,
  LogOut,
  Briefcase,
  Award,
  Flag
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/banners', label: 'Banners', icon: Flag },
  { href: '/dashboard/projects', label: 'Projects', icon: HardHat },
  { href: '/dashboard/services', label: 'Services', icon: Wrench },
  { href: '/dashboard/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/dashboard/categories', label: 'Categories', icon: Tag },
  { href: '/dashboard/careers', label: 'Careers', icon: Briefcase },
  { href: '/dashboard/clients', label: 'Clients', icon: Award },
];

export function Sidebar({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen?: boolean; 
  setIsOpen?: (val: boolean) => void; 
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('adminToken');
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className={`w-56 bg-primary text-white h-screen fixed top-0 left-0 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 border-b border-white/10 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 p-2">
          <img src="/images/logo.png" alt="Vivek Vijay Logo" className="w-full h-full object-contain drop-shadow-md" />
        </div>
        <h1 className="text-lg font-serif font-bold uppercase tracking-wide leading-tight text-white drop-shadow-sm">Vivek Vijay &amp; Co.</h1>
        <p className="text-[10px] text-secondary font-medium mt-1 uppercase tracking-[0.2em]">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/dashboard' 
            ? pathname === item.href 
            : (pathname === item.href || pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-secondary text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <Link 
          href="/" 
          target="_blank" 
          className="flex items-center justify-center w-full py-2.5 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          View Live Website
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-100 transition-colors text-sm font-medium border border-red-500/20"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
