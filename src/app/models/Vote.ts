import mongoose, { Schema } from "mongoose";

export interface IVote {
  user: mongoose.Types.ObjectId;
  school: mongoose.Types.ObjectId;
  criteria: mongoose.Types.ObjectId;
  isDelete?: boolean;
}

const VoteSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
    criteria: { type: Schema.Types.ObjectId, ref: "Criteria", required: true },
    isDelete: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model<IVote>("Vote", VoteSchema);
export default Vote;
