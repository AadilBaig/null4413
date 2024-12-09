import CataloguesDAO from "../dao/cataloguesDAO.js";

export default class CataloguesController {
  // Get all items in inventory
  static async getItems(req, res, next) {
    const response = await CataloguesDAO.getItems();

    if (!response) {
      res.status(404).json({ error: "Not Found" });
      return;
    }

    res.status(200).json(response);
  }
}
