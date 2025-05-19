import { Schema, model, Document, Types } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  description: string;
  user: Types.ObjectId;

  stars: [Number];
}

const businessSchema = new Schema<IBusiness>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stars: [
    {
      type: Number,
      min: 1,
      max: 5,
    },
  ],
});

const Business = model<IBusiness>("Business", businessSchema);

export default Business;
