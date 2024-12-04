import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // used to load env variables from .env file

const MongoClient = mongodb.MongoClient;

// server uses ports 3001, 3002 or 3003 tcp to communicate
const port = process.env.PORT || 5000;

// Connect to MongoDB
MongoClient.connect(process.env.MONGO_URL, {
  ssl: true, // Ensure SSL is enabled
})
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  })
  .then(async (client) => {
    console.log("MongoDB connected successfully!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
