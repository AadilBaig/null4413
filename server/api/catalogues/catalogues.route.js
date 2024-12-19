import express from "express";
import CataloguesController from "../../controller/catalogues.controller.js";
const router = express.Router();

router.route("/getItems").get(CataloguesController.getItems);

router.route("/getCartItems").post(CataloguesController.getCartItems);

export default router;
