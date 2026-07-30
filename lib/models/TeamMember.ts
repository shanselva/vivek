import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  designation: string;
  bio?: string;
  image?: string;
  email?: string;
  order: number;
  createdAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    email: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
