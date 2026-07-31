// models/Subscriber.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface ISubscriber extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default models.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
