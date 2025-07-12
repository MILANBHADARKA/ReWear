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
    itemImageUrl: {
        type: String,
        required: [true, "Image is required!"],
    },
    Uploader: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
}, {
    timestamps: true
});

export default mongoose.models.Cloth || mongoose.model("Cloth", clothSchema);
