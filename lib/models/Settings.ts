import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
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
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: { type: String, required: true },
    logo: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    seoTitle: { type: String },
    seoDesc: { type: String },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
