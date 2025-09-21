const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
    {
        name: { type:String, required:true },
        email: { type:String, required:true, unique:true },
        message: { type:String, required:true },
        clicked: { type:Boolean, default:false }
    },
    { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;