import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryItem extends Document {
  url?: string;
  youtubeUrl?: string;
  caption?: string;
  category?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    url: { type: String },
    youtubeUrl: { type: String },
    caption: { type: String },
    category: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

if (mongoose.models.GalleryItem) {
  delete mongoose.models.GalleryItem;
}
export const GalleryItem: Model<IGalleryItem> = mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
