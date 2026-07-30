'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Save, UploadCloud, X, ChevronDown, Check,
  Activity, Briefcase, Factory, GraduationCap, Hammer, Box, Home, Map as MapIcon, Waves, MapPin, Leaf,
  Wrench, Building2, HardHat, Compass, Shield, Truck, Zap, Ruler, Users, Droplets, PenTool, Search
} from 'lucide-react';
import Image from 'next/image';

const ICON_OPTIONS = [
  { value: 'Activity', label: 'Activity', icon: Activity },
  { value: 'Briefcase', label: 'Briefcase', icon: Briefcase },
  { value: 'Factory', label: 'Factory', icon: Factory },
  { value: 'GraduationCap', label: 'Institution', icon: GraduationCap },
  { value: 'Hammer', label: 'Hammer', icon: Hammer },
  { value: 'Box', label: 'Box', icon: Box },
  { value: 'Home', label: 'Home', icon: Home },
  { value: 'Map', label: 'Map', icon: MapIcon },
  { value: 'Waves', label: 'Waves', icon: Waves },
  { value: 'MapPin', label: 'Map Pin', icon: MapPin },
  { value: 'Leaf', label: 'Leaf', icon: Leaf },
  { value: 'Wrench', label: 'Wrench', icon: Wrench },
  { value: 'Building2', label: 'Building', icon: Building2 },
  { value: 'HardHat', label: 'Hard Hat', icon: HardHat },
  { value: 'Compass', label: 'Compass', icon: Compass },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Truck', label: 'Truck', icon: Truck },
  { value: 'Zap', label: 'Power / Zap', icon: Zap },
  { value: 'Ruler', label: 'Ruler', icon: Ruler },
  { value: 'Users', label: 'Team', icon: Users },
  { value: 'Droplets', label: 'Water / Droplets', icon: Droplets },
  { value: 'PenTool', label: 'Pen Tool', icon: PenTool },
  { value: 'Search', label: 'Search', icon: Search }
];

interface ServiceFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ServiceForm({ id, onSuccess, onCancel }: ServiceFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDesc: '',
    icon: 'HardHat',
    order: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsIconDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const res = await fetch(`/api/services/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            const s = data.data;
            setFormData({
              title: s.title || '',
              slug: s.slug || '',
              description: s.description || '',
              shortDesc: s.shortDesc || '',
              icon: s.icon || 'HardHat',
              order: s.order || 0,
            });
            if (s.image) {
              setImagePreview(s.image);
            }
          } else {
            setError(data.error || 'Failed to load service details');
          }
        } catch (err) {
          setError('Error loading service');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchService();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({ 
      ...formData, 
      [name]: name === 'order' ? parseInt(value) || 0 : value 
    });

    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value));
      });
      
      if (imageFile) {
        submitData.append('image', imageFile);
      } else if (!imagePreview && id) {
        submitData.append('removeImage', 'true');
      }

      const url = id ? `/api/services/${id}` : '/api/services';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: submitData,
      });

      const data = await res.json();
      
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Failed to save service');
      }
    } catch (err) {
      setError('An error occurred while saving the service.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex-1 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
      {}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Cover Image</h4>
          
          <div className="pt-2">
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-text-dark">Click to upload image</p>
                <p className="text-xs text-text-medium mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            ) : (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border group">
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-colors z-10"
                  title="Remove Image"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <Input
              label="Service Title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Commercial Construction"
            />
            <Input
              label="URL Slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. commercial-construction"
            />
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-dark">Icon Identifier</label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsIconDropdownOpen(!isIconDropdownOpen)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {(() => {
                      const selected = ICON_OPTIONS.find(opt => opt.value === formData.icon) || ICON_OPTIONS.find(opt => opt.value === 'HardHat');
                      const IconComp = selected?.icon || HardHat;
                      return <><IconComp size={18} className="text-primary" /> {selected?.label}</>;
                    })()}
                  </span>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
                
                {isIconDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-1 grid grid-cols-1 gap-1">
                      {ICON_OPTIONS.map((opt) => {
                        const IconComp = opt.icon;
                        const isSelected = formData.icon === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, icon: opt.value });
                              setIsIconDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${isSelected ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-50 text-slate-700'}`}
                          >
                            <IconComp size={18} className={isSelected ? 'text-primary' : 'text-slate-400'} />
                            {opt.label}
                            {isSelected && <Check size={16} className="ml-auto text-primary" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Input
              label="Display Order (lowest first)"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
            />
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Content</h4>
          <div className="flex flex-col gap-1.5 pt-2">
            <label className="text-sm font-semibold text-text-dark">Short Description (for cards)</label>
            <textarea
              name="shortDesc"
              rows={2}
              value={formData.shortDesc}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="Brief summary for service cards..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-1.5 pt-2">
            <label className="text-sm font-semibold text-text-dark">Full Description</label>
            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
              placeholder="Detailed description of the service..."
            ></textarea>
          </div>
        </div>
      </div>

      {}
      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-end gap-3 p-4 px-6 md:px-8 mt-auto">
        <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading} className="px-8 gap-2">
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Service'}
        </Button>
      </div>
    </form>
  );
}
