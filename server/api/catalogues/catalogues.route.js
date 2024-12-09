import express from "express";
import CataloguesController from "../../controller/catalogues.controller.js";
const router = express.Router();

router.route("/getItems").get(CataloguesController.getItems);

export default router;
