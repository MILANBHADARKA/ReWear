import mongoose, { Schema } from "mongoose";

const clothSchema = new Schema({
    itemName: {
        type: String,
        required: [true, "Item Name is required"]
    },
    itemDescription: {
        type: String,
        required: false
    },
    itemImageUrls: { 
        type: [String],
        required: [true, "At least one image is required"],
        validate: {
            validator: function (arr) {
                return arr.length > 0;
            },
            message: "At least one image must be provided"
        }
    },
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
    }
}, {
    timestamps: true
});

export default mongoose.models.Cloth || mongoose.model("Cloth", clothSchema);
