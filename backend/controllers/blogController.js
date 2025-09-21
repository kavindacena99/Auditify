const express = require('express');
const Blog = require('../models/Blog');

const router = express.Router();

router.post("/admin/submit", async (req, res) => {
    try{
        const { title, content, author, description } = req.body;

        const newBlog = new Blog({ title, content, author, description });
        await newBlog.save();

        res.status(201).json({ message: "Blog submtted successfully", blog: newBlog });
    }catch(error){
        res.status(500).json({ message: "Form error" });
    }
});

router.get("/admin/blogs", async (req, res) => {
    try{
        const blogs = await Blog.find().sort({ createdAt: -1});
        res.json(blogs);
    }catch(error){
        res.status(500).json({ message: "Error fetching blogs", error});
    }
});

router.delete("/admin/delete/:id", async (req,res) => {
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);

        res.json({ message: "Deleted"});
    }catch(error){
        res.status(500).json({ message: "Error deleting blog"});
    }
});

module.exports = router;