const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserProgressSchema = new Schema({
    user_id: String,
    course_id: String,
    module_id: String,
    progress: Array //Array of corresponding completed videos and quizzes ([video_Id, quiz_id])
}, { versionKey: false });

const UserProgress = mongoose.model("UserProgress", UserProgressSchema);

module.exports = UserProgress;

