const UserProgress = require("../models/UserProgress");
const Reward = require("../models/Reward");
const Module = require("../models/Module");
const ProcessedModules = require("../models/ProcessedModules");

const generateCertificateId = () => {
    return `c${Math.floor(Math.random() * 1000) + 1}`;
};
// Get Modules completed by user
const getProgressByUserID = async (req, res) => {
    const { userId } = req.params;
    try {
        const userProgresses = await UserProgress.find({ user_id: userId });
        // console.log("User progress:", userProgresses);

        const processedModules = await ProcessedModules.findOne({ user_id: userId });
        const processedModuleIds = processedModules ? processedModules.processed_modules_id : [];

        for (const progress of userProgresses) {
            const module = await Module.findById(progress.module_id);
            // console.log("Module found from Module collection:", module);

            const allCompleted = module.videos_id.concat(module.quizzes_id).length === progress.progress.length;
            console.log("Modules completed:", allCompleted);

            if (allCompleted && !processedModuleIds.includes(progress.module_id)) {
                const certificateId = generateCertificateId();
                // console.log("Certificate generated:", certificateId);

                const moduleName = module.title;
                // console.log("Module Name:", moduleName);

                await Reward.create({
                    user_id: progress.user_id,
                    module_id: progress.module_id,
                    module_name: moduleName,
                    course_id: progress.course_id,
                    certificate: certificateId
                });

                processedModuleIds.push(progress.module_id);
            }
        }

        let medal = 'none';
        if(processedModuleIds.length >= 3){
            medal = 'silver';
        }
        if (processedModuleIds.length >= 6) {
            medal = 'gold';
        }

        if (processedModules) {
            processedModules.processed_modules_id = processedModuleIds;
            processedModules.medal = medal;
            await processedModules.save();
        } else {
            await ProcessedModules.create({
                user_id: userId,
                processed_modules_id: processedModuleIds,
                medal: medal
            });
        }

        const rewards = await Reward.find({ user_id: userId });

        // Set up return format as expected by the frontend
        const formattedRewards = rewards.map(reward => ({
            module_name: reward.module_name,
            certificate: reward.certificate
        }));

        res.json({ reward: formattedRewards, medal });
    } catch (error) {
        console.error('Error generating rewards:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getProgressByUserID,
};
