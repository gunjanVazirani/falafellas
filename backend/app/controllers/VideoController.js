const Video = require("../models/Video");
const Module = require("../models/Module");

const getVideoById = async (req, res) => {
    const {id} = req.params;
    try {
        const video = await Video.findById(id);
        if (!module) {
            return res.status(404).json({error: "Course not found"});
        }
    } catch (error){

    }
}