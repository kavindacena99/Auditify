const express = require("express");
const Inquiry = require("../models/Inquiry");
const User = require("../models/User");

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

router.get("/client/inquiries", async (req, res) => {
    try{
        const inquiries = await Inquiry.find().sort({ createdAt: -1});
        res.json(inquiries);
    }catch(error){
        res.status(500).json({ message: "Error fetching inquiries", error});
    }
});

router.get("/clients", async (req, res) => {
    try{
        const clients = await User.find({ role:"client" });
        res.json(clients);
    }catch(error){
        res.status(500).json({ message: "Error fetching clients", error});
    }
});

router.put("/clients/inquiries/:id", async (req, res) => {
    try{
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
                { $set: { clicked: true } },
                { new: true }
            );
        res.json(inquiry);
    }catch(error){
        res.status(500).json({ message: "Error updating inquiry", error});
    }
});

module.exports = router;