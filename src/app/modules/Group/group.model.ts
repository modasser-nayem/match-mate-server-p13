import { model, Schema } from "mongoose";
import { IGroup } from "./group.interface";

const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    groupAdmin: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Group = model<IGroup>("Group", groupSchema);
