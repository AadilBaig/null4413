import express from "express";
import UsersController from "../../controller/users.controller.js";
const router = express.Router();

// gets list of all users
// router.route("/").get(UsersController.getAllUsers);

// get a specific user
router.route("/findUser").get(UsersController.findUser);

// register new user
router.route("/register").post(UsersController.addUser);

export default router;
