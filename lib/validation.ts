import { z } from 'zod';

const trimmedString = (max: number) => z.string().trim().min(1).max(max);
const optionalString = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

export const enquirySchema = z.object({
  name: trimmedString(100),
  email: z.string().trim().email().max(254),
  phone: optionalString(30),
  service: optionalString(120),
  message: trimmedString(5000),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(['new', 'read', 'replied']),
});

export const careerSchema = z.object({
  title: trimmedString(160),
  department: trimmedString(120),
  location: trimmedString(160),
  type: trimmedString(60).default('Full-Time'),
  experience: optionalString(120),
  salary: optionalString(120),
  description: trimmedString(10_000),
  requirements: optionalString(10_000),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().min(-10_000).max(10_000).default(0),
});

export const settingsSchema = z.object({
  id: z.string().optional(),
  companyName: trimmedString(200),
  logo: optionalString(2000),
  email: z.string().trim().email().max(254).optional().or(z.literal('')),
  phone: optionalString(50),
  address: optionalString(1000),
  facebook: z.string().trim().url().max(2000).optional().or(z.literal('')),
  instagram: z.string().trim().url().max(2000).optional().or(z.literal('')),
  linkedin: z.string().trim().url().max(2000).optional().or(z.literal('')),
  seoTitle: optionalString(200),
  seoDesc: optionalString(500),
});

export const testimonialSchema = z.object({
  name: trimmedString(120),
  company: optionalString(160),
  designation: optionalString(160),
  message: trimmedString(5000),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  image: optionalString(2000),
  active: z.boolean().default(true),
});

export const contentSchema = z.object({
  id: z.string(),
  page: trimmedString(100),
  section: trimmedString(100),
  key: trimmedString(100),
  value: z.string().max(50_000),
});
