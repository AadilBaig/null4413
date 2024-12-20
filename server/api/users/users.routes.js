import express from "express";
import UsersController from "../../controller/users.controller.js";
import AdminController from "../../controller/admin.controller.js";
const router = express.Router();

// gets list of all users
// router.route("/").get(UsersController.getAllUsers);

// get a specific user by name
router.route("/findUserName").get(UsersController.findUserName);

// get a specific user
router.route("/findUser").get(UsersController.findUser);

// get user id
router.route("/getID").get(UsersController.getID);

// register new user
router.route("/register").post(UsersController.addUser);

// add item to user's cart
router.route("/addItemToCart").post(UsersController.addItemToCart);

// update user's cart
router.route("/updateCart").post(UsersController.updateCart);

router.route("/getAllOrders").get(AdminController.getAllOrders);

router.route("/getAllUsers").get(AdminController.getAllUsers);

router.route("/getInventory").get(AdminController.getInventory);

router.route("/updateQuantity").post(AdminController.updateItemQty);

export default router;
