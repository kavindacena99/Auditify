const express = require("express");
const Inquiry = require("../models/Inquiry");

const router = express.Router();

router.post("/client/submit", async (req, res) => {
    try{
        const { name, email, message } = req.body;

        const newInquiry = new Inquiry({ name, email, message });
        await newInquiry.save();

        res.status(201).json({ message: "Inquiry submtted successfully", inquiry: newInquiry });
    }catch(error){
        res.status(500).json({ message: "Form error" });
    }
});

module.exports = router;

