import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  client?: string;
  location?: string;
  year?: number;
  featured: boolean;
  images: string[];
  coverImage?: string;
  seoTitle?: string;
  seoDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: 'ongoing' },
    client: { type: String },
    location: { type: String },
    year: { type: Number },
    featured: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    coverImage: { type: String },
    seoTitle: { type: String },
    seoDesc: { type: String },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
