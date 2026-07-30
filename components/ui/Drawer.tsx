'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export function Drawer({ isOpen, onClose, title, children, width = 'max-w-2xl' }: DrawerProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsRendered(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;
  if (!isOpen && !isRendered) return null;

  const content = (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
      />
      
      {}
      <div 
        className={`relative w-full ${width} bg-white shadow-2xl h-full flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-slate-50">
          <h2 className="text-xl font-bold text-text-dark">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-text-medium hover:text-text-dark"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
