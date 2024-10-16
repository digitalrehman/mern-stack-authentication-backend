import mongoose from "mongoose";
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
        unique: true,
    }, password: {
        type: String,
        required: true,
    }, lastLogin: {
        type: Date,
        default: Date.now,
    }, isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpire: Date,
}, {
    timestamps: true,
})

let user = mongoose.model('User', userSchema);
export default user