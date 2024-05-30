import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  status: string;
  googleId?: string;
  fullname?: string;
  role: string;
  avatar?: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: String,
    fullname: String,
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
