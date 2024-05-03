const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProcessedModulesSchema = new Schema({
    user_id: { type: String, unique: true },
    processed_modules_id: [String],
    medal:String
}, { versionKey: false });

const ProcessedModules = mongoose.model('ProcessedModules', ProcessedModulesSchema);

module.exports = ProcessedModules;
