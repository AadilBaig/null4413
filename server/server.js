const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
// server uses ports 3001, 3002 or 3003 tcp to communicate
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // used to allow frontend to communicate with the backend via routes
app.use(express.json()); // Parses json data

// Routes
//.....

// Listening to server (use command npm start)
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
