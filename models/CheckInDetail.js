import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const CheckInDetailSchema = new mongoose.Schema(
  {
    facultyName: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
    },
    arrivalDate: {
      type: String,
    },
    arrivalTime: {
      type: String,
    },
    arrivalFlightDetail: {
      type: String,
    },
    departureDate: {
      type: String,
    },
    departureTime: {
      type: String,
    },
    departureFlightDetail: {
      type: String,
    },
    hotelName: {
      type: String,
    },
    checkInDate: {
      type: String,
    },
    checkOutDate: {
      type: String,
    },
    topicName: {
      type: String,
    },
    talkDate: {
      type: Date,
    },
    talkStartTime: {
      type: Date,
    },
    talkEndTime: {
      type: Date,
    },
    arrivalCheckInStatus: {
      type: Boolean,
      default: false,
    },
    arrivalCheckInTime: {
      type: String,
    },
    departureCheckInStatus: {
      type: Boolean,
      default: false,
    },
    departureCheckInTime: {
      type: String,
    },
    hotelCheckInStatus: {
      type: Boolean,
      default: false,
    },
    hotelCheckInTime: {
      type: String,
    },
    hallCheckInStatus: {
      type: Boolean,
      default: false,
    },
    hallCheckInTime: {
      type: String,
    },
    presentationSubmitStatus: {
      type: Boolean,
      default: false,
    },
    presentationSubmitTime: {
      type: String,
    },
  },
  { timestamps: true }
);



export default mongoose.models.CheckInDetail || mongoose.model("CheckInDetail", CheckInDetailSchema);
