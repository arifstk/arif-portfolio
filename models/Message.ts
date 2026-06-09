// models/Message.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
