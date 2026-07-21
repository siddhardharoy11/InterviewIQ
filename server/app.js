const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const app = express();
const healthRoutes = require("./routes/healthRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/interviews", interviewRoutes);
app.use("/health", healthRoutes);
app.get("/", (req, res) => {
    res.json({ message: "InterviewIQ Backend Running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);