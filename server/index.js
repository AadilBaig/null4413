import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import UsersDAO from "./dao/usersDao.js";
import CataloguesDAO from "./dao/cataloguesDAO.js";
import adminDAO from "./dao/adminDAO.js";
dotenv.config(); // used to load env variables from .env file

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 3001;

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

    // Sends MongoDB connection object to respective DAOs
    await UsersDAO.injectDB(client);
    await adminDAO.injectDB(client);
    await CataloguesDAO.injectDB(client);
    //...
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
