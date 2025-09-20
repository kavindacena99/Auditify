const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authController = require("./controllers/authController");
const clientController = require("./controllers/clientController");
const serviceController = require("./controllers/serviceController");

dotenv.config(); // load env variables

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// connect to mongodb
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB Error", err));

// routes
app.use("/api/auth", authController);
app.use("/api/inquiry", clientController);
app.use("/api/service", serviceController);

// server starts
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});