const express = require("express");

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

