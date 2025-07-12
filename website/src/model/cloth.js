import mongoose, { Schema } from "mongoose";

const clothSchema = new Schema({
  Uploader: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Sold', 'Unavailable'],
    default: 'Available'
  },
  points: {
    type: Number,
    required: true,
    min: [0, "Points must be a non-negative number"]
  },
  lists: [
    {
      title: {
        type: String,
        required: [true, "Title is required"]
      },
      descriptions: {
        type: String,
        required: false
      },
      images: {
        type: [String],
        required: [true, "At least one image is required"],
        validate: {
          validator: function (arr) {
            return arr.length > 0;
          },
          message: "At least one image must be provided in each list"
        }
      },
      size: {
        type: String,
        required: false
      },
      condition: {
        type: String,
      },
      type: {
        type: String,
        required: false
      },
      description: {
        type: String,
        required: false
      },
      tags: {
        type: [String],
        default: []
      }
    }
  ]
}, {
  timestamps: true
});

export default mongoose.models.Cloth || mongoose.model("Cloth", clothSchema);
