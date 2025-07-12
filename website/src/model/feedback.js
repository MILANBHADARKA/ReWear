import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Cloth",
    required: [true, "Item ID is required"]
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Seller ID is required"]
  },
  description: {
    type: String,
    required: [true, "Feedback description is required"]
  },
  sentiment: {
    type: String,
    enum: ['positive', 'negative'],
    required: [true, "Sentiment is required"]
  }
}, {
  timestamps: true
});

export default mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
