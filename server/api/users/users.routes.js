import express from "express";
import UsersController from "../../controller/users.controller.js";
const router = express.Router();

// gets list of all users
// router.route("/").get(UsersController.getAllUsers);

// get a specific user by name
router.route("/findUserName").get(UsersController.findUserName);

// get a specific user
router.route("/findUser").get(UsersController.findUser);

// get user id
router.route("/getID").get(UsersController.getID);

// get user's address
router.route("/getAddress").get(UsersController.getAddress);

// update user's address when checking out
router.route("/updateAddress").post(UsersController.updateAddress);

// add user address
router.route("/addAddress").post(UsersController.addAddress);

// register new user
router.route("/register").post(UsersController.addUser);

// add item to user's cart
router.route("/addItemToCart").post(UsersController.addItemToCart);

// update user's cart
router.route("/updateCart").post(UsersController.updateCart);

// updates inventory
router.route("/updateInventory").post(UsersController.updateInventory);

export default router;
