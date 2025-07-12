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
  },
  dateBought: {
    type: Date,
    required: false,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: "Date bought must be a valid date"
    }
  },
  rentedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  rentedDate: {
    type: Date,
    required: false,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: "Rented date must be a valid date"
    }
  },
  rentedUntil: {
    type: Date,
    required: false,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: "Rented until must be a valid date"
    }
  },
  rentedPrice: {
    type: Number,
    required: false,
    min: [0, "Rented price must be a non-negative number"]
  },
  rentedStatus: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending'
  },
  BoughtBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false
  },

  category: {
    type: String,
    required: false,
    default: 'Others'
  }

}, {
  timestamps: true
});

export default mongoose.models.Cloth || mongoose.model("Cloth", clothSchema);
