
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: 'ongoing' | 'completed';
  client?: string;
  location?: string;
  year?: number;
  featured: boolean;
  images: string[];
  coverImage?: string;
  seoTitle?: string;
  seoDesc?: string;
  createdAt: string;
  updatedAt: string;
}


export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string;
  icon?: string;
  image?: string;
  order: number;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  url?: string;
  youtubeUrl?: string;
  caption?: string;
  category?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  designation?: string;
  message: string;
  rating: number;
  image?: string;
  active: boolean;
}


export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  image?: string;
  email?: string;
  order: number;
}


export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}


export interface SiteSettings {
  id: string;
  companyName: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  seoTitle?: string;
  seoDesc?: string;
}


export interface ContentBlock {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
}


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}