const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: String,
    name: String,
    email: {
        type: String,
        required: true
    },
    phone_number: String,
    designation: String,
    roles: String,
    password: String,
    birth_date: Date,
    rewards_earned: Number
}, { versionKey: false });

const User = mongoose.model("User", UserSchema);

module.exports = User;