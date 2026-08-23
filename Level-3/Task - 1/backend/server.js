const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./routes/postRoutes");

const app = express();


// ================================
// Middleware
// ================================

app.use(cors());

app.use(express.json());
app.use("/api/posts", postRoutes);


// ================================
// MongoDB Connection
// ================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

    })
    .catch((error) => {

        console.error("MongoDB connection failed:");
        console.error(error.message);

    });


// ================================
// Test Route
// ================================

app.get("/", (req, res) => {

    res.json({
        message: "Blog Manager API is running"
    });

});


// ================================
// Start Server
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});