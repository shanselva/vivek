'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Save, UploadCloud, X, Images } from 'lucide-react';
import Image from 'next/image';

interface ProjectFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProjectForm({ id, onSuccess, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    status: 'ongoing',
    featured: false,
    order: 0,
    location: '',
    client: '',
    year: '',
  });

  const [categories, setCategories] = useState<{name: string, slug: string}[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Multiple extra images
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [extraFiles, setExtraFiles] = useState<File[]>([]);
  const [extraPreviews, setExtraPreviews] = useState<string[]>([]);
  const extraFileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const res = await fetch(`/api/projects/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            const p = data.data;
            setFormData({
              title: p.title || '',
              slug: p.slug || '',
              description: p.description || '',
              category: p.category || 'Commercial',
              status: p.status || 'ongoing',
              featured: p.featured || false,
              order: p.order || 0,
              location: p.location || '',
              client: p.client || '',
              year: p.year ? p.year.toString() : '',
            });
            if (p.coverImage) {
              setImagePreview(p.coverImage);
            }
            if (p.images && p.images.length > 0) {
              setExistingImages(p.images);
            }
          } else {
            setError(data.error || 'Failed to load project details');
          }
        } catch (err) {
          setError('Error loading project');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProject();
    }
  }, [id]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success) {
          const projectCats = data.data.filter((c: any) => c.type === 'project' || c.type === 'general');
          setCategories(projectCats);
          if (!formData.category && projectCats.length > 0) {
            setFormData(prev => ({ ...prev, category: projectCats[0].name }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: name === 'order' ? parseInt(value) || 0 : value });
    }

    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleSelectChange = (value: string, name?: string) => {
    if (name) {
      setFormData({ ...formData, [name]: value });
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

  const handleExtraImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const currentTotal = existingImages.length + extraFiles.length;
    const canAdd = 10 - currentTotal;
    const filesToAdd = files.slice(0, Math.max(0, canAdd));
    setExtraFiles(prev => [...prev, ...filesToAdd]);
    setExtraPreviews(prev => [...prev, ...filesToAdd.map(f => URL.createObjectURL(f))]);
    if (extraFileInputRef.current) extraFileInputRef.current.value = '';
  };

  const removeExtraImage = (index: number) => {
    setExtraFiles(prev => prev.filter((_, i) => i !== index));
    setExtraPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
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
        submitData.append('coverImage', imageFile);
      } else if (!imagePreview && id) {
        submitData.append('removeCoverImage', 'true');
      }
      
      
      if (id) {
        submitData.append('existingImages', JSON.stringify(existingImages));
      }

      
      extraFiles.forEach(file => submitData.append('images', file));

      const url = id ? `/api/projects/${id}` : '/api/projects';
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
        setError(data.error || 'Failed to create project');
      }
    } catch (err) {
      setError('An error occurred while creating the project.');
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
              <p className="text-sm font-semibold text-text-dark">Click to upload cover image</p>
              <p className="text-xs text-text-medium mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          ) : (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border group">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
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
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
        </div>
      </div>

      {}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2 flex items-center gap-2">
          <Images size={14} /> Project Gallery Images
          <span className="text-text-medium font-normal normal-case text-[11px]">(optional — up to 10)</span>
        </h4>
        <div className="pt-2">
          <div
            onClick={() => extraFileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors group mb-4"
          >
            <UploadCloud size={20} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-semibold text-text-dark">Select multiple images</p>
            <p className="text-xs text-text-medium mt-0.5">PNG, JPG, WEBP — hold Ctrl/Cmd to select many</p>
            {extraFiles.length > 0 && (
              <span className="mt-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full font-semibold">
                {extraFiles.length} image{extraFiles.length > 1 ? 's' : ''} selected
              </span>
            )}
          </div>
          <input type="file" ref={extraFileInputRef} onChange={handleExtraImagesChange} accept="image/*" multiple className="hidden" />
          {(existingImages.length > 0 || extraPreviews.length > 0) && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {existingImages.map((src, index) => (
                <div key={`existing-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                  <Image src={src} alt={`Existing ${index + 1}`} fill className="object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeExistingImage(index)} 
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 z-10"
                    title="Remove Image"
                  >
                    <X size={14} />
                  </button>
                  <span className="absolute bottom-1 left-1 bg-blue-500/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium shadow-sm">Old</span>
                </div>
              ))}
              {extraPreviews.map((src, index) => (
                <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                  <Image src={src} alt={`New Extra ${index + 1}`} fill className="object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeExtraImage(index)} 
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 z-10"
                    title="Remove Image"
                  >
                    <X size={14} />
                  </button>
                  <span className="absolute bottom-1 left-1 bg-green-500/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium shadow-sm">New</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Basic Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <Input
            label="Project Title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Skyline Tower"
          />
          <Input
            label="URL Slug"
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g. skyline-tower"
          />
        </div>
      </div>

      {/* Classification */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Classification</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="flex flex-col gap-1.5">
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
              options={categories.map(cat => ({ label: cat.name, value: cat.name }))}
              placeholder={categories.length === 0 ? "No categories found" : "Select a category"}
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
              options={[
                { label: 'Ongoing', value: 'ongoing' },
                { label: 'Completed', value: 'completed' },
              ]}
            />
          </div>
        </div>
      </div>

      {}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">Additional Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. New York, NY"
          />
          <Input
            label="Client Name"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="e.g. Acme Corp"
          />
          <Input
            label="Completion Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2024"
          />
          <Input
            label="Display Order (lowest first)"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1.5 pt-2">
          <label className="text-sm font-semibold text-text-dark">Project Description</label>
          <textarea
            name="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-border rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
            placeholder="Write a detailed description of the project..."
          ></textarea>
        </div>
      </div>

      {}
      <div className="bg-slate-50 p-4 rounded-lg border border-border flex items-start gap-3">
        <div className="pt-0.5">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary/50 cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="featured" className="text-sm font-bold text-text-dark cursor-pointer block">
            Feature this project on the homepage
          </label>
          <p className="text-xs text-text-medium mt-0.5">Featured projects appear prominently in the main portfolio section.</p>
        </div>
      </div>

      </div>

      {}
      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-end gap-3 p-4 px-6 md:px-8 mt-auto">
        <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading} className="px-8 gap-2">
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Project'}
        </Button>
      </div>
    </form>
  );
}
