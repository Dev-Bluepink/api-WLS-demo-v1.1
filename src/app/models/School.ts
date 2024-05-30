import mongoose, { Schema, Document } from "mongoose";

export interface ISchool extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  rank?: string;
  vote?: string;
  schoolyear?: string;
  avatar?: string;
  content?: string;
  address: string;
  level?: string;
  phone?: string;
  banner?: string;
  email?: string;
  status?: string;
  obdata?: string;
  tinh: string;
  quan: string;
  xa: string;
  captruong: string;
  countryid?: string;
}

const SchoolSchema: Schema = new Schema(
  {
    name: { type: String, default: null },
    rank: { type: String, default: null },
    vote: { type: String, default: null },
    schoolyear: { type: String, default: null },
    avatar: { type: String, default: null },
    content: { type: String, default: null },
    address: { type: String, default: null },
    level: { type: String, default: null },
    phone: { type: String, default: null },
    banner: { type: String, default: null },
    email: { type: String, default: null },
    obdata: { type: String, default: null },
    tinh: { type: String, default: null },
    quan: { type: String, default: null },
    xa: { type: String, default: null },
    captruong: { type: String, default: null },
    countryid: { type: String, default: null },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
  },
  {
    timestamps: true,
  }
);

const School = mongoose.model<ISchool>("School", SchoolSchema);

export default School;
