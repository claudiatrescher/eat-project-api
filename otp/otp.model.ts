
import mongoose from "mongoose";

export interface Otp extends mongoose.Document {
  phone: string;
  email: string;
  otp: string;
  secret: string;
}

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  otp: { type: String, required: true },
  secret: { type: String, required: true },
});

export const OtpModel = mongoose.model<Otp>('Otp', otpSchema);