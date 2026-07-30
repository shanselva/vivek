import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICareer extends Document {
  title: string;
  department: string;
  location: string;
  type: string;
  experience?: string;
  salary?: string;
  description: string;
  requirements?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, default: 'Full-Time' },
    experience: { type: String },
    salary: { type: String },
    description: { type: String, required: true },
    requirements: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Career: Model<ICareer> =
  mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema);
