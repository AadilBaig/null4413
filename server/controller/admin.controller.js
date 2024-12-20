import adminDAO from "../dao/adminDAO.js";

export default class AdminController {
    static async getAllOrders(req, res, next) {
        const response = await adminDAO.getAllOrders();
    
        // Unable to find user
        if (!response) {
          res.status(401).json({ error: "Not Found" });
          return;
        }
        console.log(response)
        res.status(200).json(response);
    }

    static async getAllUsers(req, res, next) {
        const response = await adminDAO.getAllUsers();

        // Unable to find user
        if (!response) {
            res.status(401).json({ error: "Not Found" });
            return;
        }
        console.log(response)
        res.status(200).json(response);
    }

    static async getInventory(req, res, next) {
        const response = await adminDAO.getInventory();

        // Unable to find user
        if (!response) {
            res.status(401).json({ error: "Not Found" });
            return;
        }
        console.log(response)
        res.status(200).json(response);
    }

    static async updateItemQty(req, res, next) {
        const { itemId, quantity } = req.body;
        if (!itemId || quantity == null) {
            res.status(400).json({ error: "itemId and quantity are required." });
            return;
        }

        try {
            const response = await adminDAO.updateItem(itemId, parseInt(quantity, 10));

            if (!response) {
                res.status(404).json({ error: "Item not found or update failed." });
                return;
            }

            res.status(200).json({ success: true, data: response });
        } catch (error) {
            res.status(500).json({ error: "An error occurred while updating the item." });
        }
    }

    static async getUsersOrders(req, res, next){
        const userId = req.query.userId;
        const response = await adminDAO.getUsersOrders(userId);

        // Unable to find user
        if (!response) {
            res.status(401).json({ error: "Not Found" });
            return;
        }
        console.log(response)
        res.status(200).json(response);
    }

    static async getUserInfo(req, res, next) {
        const userEmail = req.query.email;
        const userId = req.query.userId;
        const response = await adminDAO.getUserInfo(userEmail, userId);

        // Unable to find user
        if (!response) {
            res.status(401).json({ error: "Not Found" });
            return;
        }
        console.log(response)
        res.status(200).json(response);
    }

    static async updateCustomerInfo(req, res, next) {
        const userId = req.body.userEmail;
        const updatedInfo = {
            addressStreet: req.body.addressStreet,
            addressProvince: req.body.addressProvince,
            addressCountry: req.body.addressCountry,
            addressZip: req.body.addressZip,
            addressPhoneNum: req.body.addressPhoneNum,
            addressCreditCard: req.body.addressCreditCard,
        };

        try {
        const response = await adminDAO.updateCustomerInfo(userId, updatedInfo);

        if (!response) {
            res.status(401).json({ error: "Not Found" });
            return;
        }
        console.log(response)
        res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while updating the user." });
        }
    }


}