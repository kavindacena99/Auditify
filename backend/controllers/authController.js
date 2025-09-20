const express = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const { firstname, lastname, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    }catch(error){
        res.status(500).json({ message: "Register form error" });
    }
});

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({ message: "Invalid credits" });
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login Successful", token, user });
    }catch(error){
        console.error("Login error: ", error);
        res.status(500).json({ message: "login form error" });
    }
});

module.exports = router;