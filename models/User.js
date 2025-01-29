import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    }, // to store hash code for the password from user
    avatarUrl: String //not required
}, {
   timestamps: true, //update
})
//created Model
export default mongoose.model("User", UserSchema) 