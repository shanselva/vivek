import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteContent extends Document {
  page: string;
  section: string;
  key: string;
  value: string;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    page: { type: String, required: true },
    section: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);
