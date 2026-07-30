'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Save, UploadCloud, X, Images } from 'lucide-react';
import Image from 'next/image';

interface GalleryFormProps {
  id?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function GalleryForm({ id, onSuccess, onCancel }: GalleryFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    caption: '',
    category: '',
    youtubeUrl: '',
    featured: false,
    order: 0,
  });

  const [categories, setCategories] = useState<{name: string, slug: string}[]>([]);

  // For editing: single image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // For adding: multiple images
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [multiplePreviews, setMultiplePreviews] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const res = await fetch(`/api/gallery/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            const g = data.data;
            setFormData({
              caption: g.caption || '',
              category: g.category || 'General',
              youtubeUrl: g.youtubeUrl || '',
              featured: g.featured || false,
              order: g.order || 0,
            });
            if (g.url) setImagePreview(g.url);
          } else {
            setError(data.error || 'Failed to load gallery item');
          }
        } catch {
          setError('Error loading gallery item');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchItem();
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success) {
          const galleryCats = data.data.filter((c: any) => c.type === 'gallery' || c.type === 'general');
          setCategories(galleryCats);
          
          if (!formData.category && galleryCats.length > 0) {
            setFormData(prev => ({ ...prev, category: galleryCats[0].name }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: name === 'order' ? parseInt(value) || 0 : value });
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
      setImagePreview(URL.createObjectURL(file));
    }
  };

  
  const handleMultipleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const existingCount = multipleFiles.length;
    const totalAllowed = 20;
    const canAdd = totalAllowed - existingCount;
    const filesToAdd = files.slice(0, canAdd);

    setMultipleFiles(prev => [...prev, ...filesToAdd]);
    setMultiplePreviews(prev => [...prev, ...filesToAdd.map(f => URL.createObjectURL(f))]);

    
    if (multiFileInputRef.current) multiFileInputRef.current.value = '';
  };

  const removeMultipleImage = (index: number) => {
    setMultipleFiles(prev => prev.filter((_, i) => i !== index));
    setMultiplePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!id && multipleFiles.length === 0 && !formData.youtubeUrl) {
      setError('Please select at least one image or provide a YouTube link.');
      return;
    }
    if (id && !imageFile && !imagePreview && !formData.youtubeUrl) {
      setError('Please select an image or provide a YouTube link.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');

      if (id) {
        
        const submitData = new FormData();
        Object.entries(formData).forEach(([key, val]) => submitData.append(key, String(val)));
        if (imageFile) submitData.append('image', imageFile);

        const res = await fetch(`/api/gallery/${id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: submitData,
        });
        const data = await res.json();
        if (data.success) {
          onSuccess();
        } else {
          setError(data.error || 'Failed to save gallery item');
        }
      } else {
        
        const submitData = new FormData();
        Object.entries(formData).forEach(([key, val]) => submitData.append(key, String(val)));
        multipleFiles.forEach(file => submitData.append('images', file));

        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: submitData,
        });
        const data = await res.json();
        if (data.success) {
          onSuccess();
        } else {
          setError(data.error || 'Failed to upload images');
        }
      }
    } catch {
      setError('An error occurred while saving.');
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
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
        )}

        {}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">
            {id ? 'Gallery Image' : (
              <span className="flex items-center gap-2">
                <Images size={14} /> Multiple Images Upload
                <span className="text-red-500 font-normal normal-case">*</span>
              </span>
            )}
          </h4>

          <div className="pt-2">
            {id ? (
              
              <>
                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-56 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud size={24} className="text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-text-dark">Click to upload image</p>
                    <p className="text-xs text-text-medium mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                ) : (
                  <div className="relative w-full h-56 rounded-xl overflow-hidden border border-border group">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={clearImage} className="bg-white/20 hover:bg-red-500 text-white backdrop-blur-md p-2 rounded-full transition-colors">
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              </>
            ) : (
              
              <>
                {}
                <div
                  onClick={() => multiFileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-primary/40 rounded-xl flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors group mb-4"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} className="text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-text-dark">Click to select images</p>
                  <p className="text-xs text-text-medium mt-1">Select multiple images — PNG, JPG, WEBP up to 5MB each</p>
                  {multipleFiles.length > 0 && (
                    <span className="mt-2 text-xs bg-primary text-white px-2.5 py-0.5 rounded-full font-semibold">
                      {multipleFiles.length} image{multipleFiles.length > 1 ? 's' : ''} selected
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  ref={multiFileInputRef}
                  onChange={handleMultipleImagesChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                {/* Preview grid */}
                {multiplePreviews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {multiplePreviews.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                        <Image src={src} alt={`Preview ${index + 1}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeMultipleImage(index)}
                            className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-2">
            {id ? 'Image Details' : 'Details (applied to all images)'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <Input label="Caption" name="caption" value={formData.caption} onChange={handleChange} placeholder="e.g. Office Building Interior" />
            <Input label="YouTube Video Link (Optional)" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="e.g. https://www.youtube.com/watch?v=..." />
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
          </div>
          <Input label="Display Order (lowest first)" name="order" type="number" value={formData.order} onChange={handleChange} />
        </div>

        {}
        <div className="bg-slate-50 p-4 rounded-lg border border-border flex items-start gap-3">
          <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange}
            className="w-5 h-5 text-primary rounded border-gray-300 mt-0.5 cursor-pointer" />
          <div>
            <label htmlFor="featured" className="text-sm font-bold text-text-dark cursor-pointer block">Feature this image</label>
            <p className="text-xs text-text-medium mt-0.5">Featured images appear prominently on the gallery page.</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-slate-50 flex justify-between items-center gap-3 p-4 px-6 md:px-8">
        {!id && multipleFiles.length > 0 && (
          <span className="text-sm text-text-medium">
            Uploading <strong className="text-primary">{multipleFiles.length}</strong> image{multipleFiles.length > 1 ? 's' : ''}
          </span>
        )}
        {!(!id && multipleFiles.length > 0) && <span />}
        <div className="flex gap-3">
          <Button type="button" variant="outline" className="px-6" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={loading} className="px-8 gap-2">
            <Save size={16} />
            {loading ? 'Uploading...' : id ? 'Save Item' : `Upload ${multipleFiles.length > 0 ? multipleFiles.length + ' ' : ''}Item${multipleFiles.length > 1 ? 's' : ''}`}
          </Button>
        </div>
      </div>
    </form>
  );
}
