import express from "express";
import cors from "cors";

// Route/api imports
import catalogues from "./api/catalogues.route.js";

const app = express();

// Middleware
app.use(cors()); // used to allow frontend to communicate with the backend via routes
app.use(express.json()); // Allows server to accept json in the body of a request

// Routes (will be in routes folder)
app.use("/api/v1/catalogues", catalogues);
app.use("*", (req, res) =>
  res.status(404).json({ error: "path doens't exists" })
);

export default app;
