import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: string;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: 'new' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
