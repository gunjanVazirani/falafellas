/*
This code defines the functions for our Express application.
================================
Author: Aditya Pattani, Samit Mhatre
Last Updated: 03-04-2024
================================
*/


const Module = require("../models/Module");
const Video = require("../models/Video");
const Quiz = require("../models/Quiz");
const mongoose = require("mongoose");

const getModuleById = async (req, res) => {
    const {id} = req.params;
    try{
        const module = await Module.findById(id);
        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }
        const videos = module.videos_id || [];
        const quizzes = module.quizzes_id || [];

        const videoQuery = { _id: { $in: videos } };
        const videoDocuments = await Video.find(videoQuery);

        const quizQuery = { _id: { $in: quizzes } };
        console.log("in get quiz ", quizQuery);
        const quizDocuments = await Quiz.find(quizQuery);

        res.json({
            module : module,
            videos : videoDocuments,
            quizzes: quizDocuments
        })

    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}



const addModule = async (req, res) =>{
    const {numeric_id, title, description, author, videos_id, quizzes_id, duration, is_mandatory, reward_points, fileName} = req.body;
    let videoArray = [];

    videos_id.forEach(function(video){
        const newVideo = new Video({
            _id: new mongoose.Types.ObjectId(),
            drive_url: video.drive_url || "",
            description: video.description,
            name: video.name,
            duration: video.duration
        });
        videoArray.push(newVideo);
    })

    let quizzesArray = [];
    quizzes_id.forEach(function(quiz) {
        const newQuiz = new Quiz({
            _id: new mongoose.Types.ObjectId(),
            name: quiz.name,
            questions: quiz.questions,
            answers: quiz.answers,
            options: quiz.options,
            time_limit: quiz.time_limit,
            minimum_marks: quiz.minimum_marks,
            deadline: quiz.deadline
        })
        quizzesArray.push(newQuiz);
    })

    let videosCreatedId = [];
    let quizCreatedId = [];
    try{
        const videosCreated = await Video.insertMany(videoArray);
        videosCreatedId = videosCreated.map(doc => doc._id);
        console.log(videosCreatedId);
    } catch(error){
        console.log(error);
        res.status(400).json({doc: "video",error: error.message});
    }
    console.log(videosCreatedId);

    try {
        const quizzesCreated = await Quiz.insertMany(quizzesArray);
        quizCreatedId = quizzesCreated.map(doc => doc._id);
        console.log(quizCreatedId);
    } catch(error){
        console.log(error);
        res.status(400).json({doc: "quiz",error: error.message});
    }
    console.log(quizCreatedId);

    try{
        const newModule = await Module.create({_id:new mongoose.Types.ObjectId(), numeric_id, title, description, author, videos_id: videosCreatedId, quizzes_id: quizCreatedId, duration, is_mandatory, reward_points});
        res.status(201).json({message:"Success.", doc: newModule});
    } catch(error){
        console.log(error);
        res.status(400).json({doc: "module",error: error.message});
    }
}


//API to update the values of a module
const updateModule = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const module = await Module.findById(id);
        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }

        // Update each field provided in the request body
        for (const key in updates) {
            module[key] = updates[key];
        }

        const updatedModule = await module.save();

        res.json({ message: "Module updated successfully", updatedModule });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getModuleById,
    addModule,
    updateModule
};
