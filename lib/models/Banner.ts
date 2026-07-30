import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBanner extends Document {
  type: 'image' | 'video';
  src: string;
  eyebrow?: string;
  heading1: string;
  heading2?: string;
  location?: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    src: { type: String, required: true },
    eyebrow: { type: String },
    heading1: { type: String, required: true },
    heading2: { type: String },
    location: { type: String },
    subtitle: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Banner: Model<IBanner> =
  mongoose.models.Banner || mongoose.model<IBanner>('Banner', BannerSchema);
