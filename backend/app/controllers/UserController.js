/*
This code defines the functions for our Express application.
================================
Author: Aditya Pattani, Samit Mhatre
Last Updated: 03-04-2024
================================
*/

const User = require("../models/User"); 
const crypto = require('crypto');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ message: "Users retrieved", success: true, users: users});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ success: true, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const addUser = async (req, res) => {
    const {_id, name, email, phone_number, designation, roles, password, birth_date, rewards_earned } = req.body;
    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const newUser = await User.create({
            _id,
            name,
            email,
            phone_number,
            designation,
            roles,
            password: hashedPassword,
            birth_date,
            rewards_earned
        });

        res.status(201).json({ message: "User added", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, designation, roles, password, birth_date, rewards_earned } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        user.name = name;
        user.email = email;
        user.phone_number = phone_number;
        user.designation = designation;
        user.roles = roles;
        user.password = password;
        user.birth_date = birth_date;
        user.rewards_earned = rewards_earned;

        await user.save();

        res.json({ message: "User updated", success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProcess = await User.deleteOne({ _id: id });
        if (!deleteProcess) {
            res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUserById
};
