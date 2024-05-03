const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({
    _id: String,
    drive_url: String,
    description: String,
    name: String,
    duration: Number
}, { versionKey: false });

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;

