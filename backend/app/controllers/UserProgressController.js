const UserProgress = require("../models/UserProgress");
const Module = require("../models/Module");
const Video = require("../models/Video");
const Quiz = require("../models/Quiz");

const getProgressByUserIDandModuleID = async (req, res) => {
    const {user_id, module_id} = req.body;
    try{
        const module_progress = await UserProgress.findOne({
            user_id:user_id,
            module_id:module_id
        });
        console.log("module ",module_progress)
        res.json({
            module_progress : module_progress,
        })

    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addUserProgress = async (req, res) =>{
    const {userId, courseId, moduleId} = req.body;
    try {
        const existingUP = await UserProgress.findOne({
            user_id: userId,
            course_id: courseId,
            module_id: moduleId
        });

        if (existingUP) {
            return res.status(200).json({ message: "User progress already exists." });
        }
        const addedUP = await UserProgress.create({
            user_id: userId,
            course_id: courseId,
            module_id: moduleId,
            progress: []
        })

        res.status(201).json({message:"User progress added.", doc: addedUP});
    } catch (error) {
        console.error('Error adding UserProgress:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUserProgressByUserIdAndModuleId = async (req, res) => {
    const {userId, moduleId, contentId} = req.body;
    try {
        const updatedDocument = await UserProgress.findOneAndUpdate(
            { user_id: userId, module_id: moduleId },
            { $addToSet: { progress: contentId } },
            { new: true, upsert: false }
        );

        if(updatedDocument) {
            res.json({
                message: 'updated successfully',
                data: updatedDocument
            });
        } else {
            res.status(404).json({ message: 'UserProgress not found for the given userId and moduleId' });
        }
    } catch (error) {
        console.error('Error updating UserProgress:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getProgressByUserIDandModuleID,
    updateUserProgressByUserIdAndModuleId,
    addUserProgress
};
