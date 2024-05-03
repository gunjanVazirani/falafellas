/*
This code defines the functions for our Express application.
================================
Author: Aditya Pattani, Samit Mhatre
Last Updated: 03-04-2024
================================
*/


const Course = require("../models/Course"); 
const crypto = require('crypto');
const mongoose = require("mongoose");

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ message: "Users retrieved", success: true, courses: courses});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json({ success: true, course: course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const addCourse = async (req, res) => {
    const { name, description, deadline, tutor, rating, modules, reward_points, certificate } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const newCourse = await Course.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            deadline,
            tutor,
            rating,
            modules,
            reward_points,
            certificate
        });

        res.status(201).json({ message: "Course added", success: true, courseId: newCourse._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, designation, roles, password, birth_date, rewards_earned } = req.body;

    try {
        const course = await Course.findById(id);
        if (!course) {
            res.status(404).json({ error: "Course not found" });
        }

        course.name = name;
        course.email = email;
        course.phone_number = phone_number;
        course.designation = designation;
        course.roles = roles;
        course.password = password;
        course.birth_date = birth_date;
        course.rewards_earned = rewards_earned;

        await course.save();

        res.json({ message: "Course updated", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProcess = await Course.deleteOne({ _id: id });
        if (!deleteProcess) {
            res.status(404).json({ error: "Course not found" });
        }

        res.json({ message: "Course deleted", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourseById
};
