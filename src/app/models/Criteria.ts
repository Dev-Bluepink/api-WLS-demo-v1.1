import mongoose, { Schema } from "mongoose";

export interface ICriteria {
  description: string;
  status?: string;
}

const CriteriaSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Criteria = mongoose.model<ICriteria>("Criteria", CriteriaSchema);
export default Criteria;
