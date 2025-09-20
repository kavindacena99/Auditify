const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

router.post("/admin/add", async (req, res) => {
    try{
        const { title, description } = req.body;

        const newService = new Service({ title, description });
        await newService.save();

        res.status(201).json({ message: "Service submitted successfully", service: newService });
    }catch(error){
        res.status(500).json({ message: "Form error" });
    }
});

router.delete("/admin/delete/:id", async (req, res) => {
    try{
        const service = await Service.findByIdAndDelete(req.params.id);

        res.json({ message: "Deleted"});
    }catch(error){
        res.status(500).json({ message: "Error deleting service"});
    }
});

router.get("/admin/load", async (req, res) => {
    try{
        const services = await Service.find().sort({ createdAt: -1});
        res.json(services);
    }catch(error){
        res.status(500).json({ message: "Error fetching services", error});
    }
});

module.exports = router;