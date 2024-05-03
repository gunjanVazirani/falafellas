const mongoose = require("mongoose");
const { Schema } = mongoose;

const RewardSchema = new Schema({
    user_id: String,
    module_id: { type: String, unique: true },
    module_name: String,
    course_id: String,
    certificate: String
}, { versionKey: false });

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;

