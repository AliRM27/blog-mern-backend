import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: []
    },
    viewNumber: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //Creating a relationship between Post and User
        required: true
    },
    imageUrl: String
}, {
    timestamps: true,
})
//created Model
export default mongoose.model("Post", PostSchema) 