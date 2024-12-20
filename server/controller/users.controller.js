import UsersDAO from "../dao/usersDao.js";
import AddressDAO from "../dao/addressDAO.js";
import CataloguesDAO from "../dao/cataloguesDAO.js";
import OrdersDAO from "../dao/ordersDAO.js";

export default class UsersController {
  // Controller method for finding a user by email
  static async findUserName(req, res, next) {
    const email = req.query.name;
    const response = await UsersDAO.getUserName(email);

    // Unable to find user
    if (!response) {
      res.status(401).json({ error: "Not Found" });
      return;
    }

    res.status(200).json(response);
  }

  // Constroller method for finding a user
  static async findUser(req, res, next) {
    const email = req.query.name;
    const password = req.query.password;

    const response = await UsersDAO.getUser(email, password);

    // Unable to find user
    if (!response) {
      res.status(401).json({ error: "Not Found" });
      return;
    }

    res.status(200).json(response);
  }

  // Controller method for adding a new user
  static async addUser(req, res, next) {
    const { firstName, lastName, email, password, cart } = req.body;
    const response = await UsersDAO.addUser({
      firstName,
      lastName,
      email,
      password,
      cart,
    });

    if (!response) {
      res.status(500).json({ error: "Unexpected server error" });
      return;
    }

    res.status(200).json(response);
  }

  // Controller method for add item to user's cart
  static async addItemToCart(req, res, next) {
    const { email, itemName, qty } = req.body;
    const response = await UsersDAO.addItemToCart(email, itemName, qty);

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // Controller method for updating user's cart
  static async updateCart(req, res, next) {
    const { email, cart } = req.body;
    // console.log(cart);
    // console.log(email);

    const response = await UsersDAO.updateCart(email, cart);

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // Controller method for getting user ID
  static async getID(req, res, next) {
    const email = req.query.email;
    console.log(email);

    const response = await UsersDAO.getID(email);

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // Controller method for getting user address
  static async getAddress(req, res, next) {
    const id = req.query.id;
    console.log(id);

    const response = await AddressDAO.getAddress(id);

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // Controller method for updateing user address
  static async updateAddress(req, res, next) {
    const { userid, street, province, country, zip, phoneNum, creditcard } =
      req.body;

    const response = await AddressDAO.updateAddress(
      userid,
      street,
      province,
      country,
      zip,
      phoneNum,
      creditcard
    );

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // method for updating inventory
  static async updateInventory(req, res, next) {
    const { orderList } = req.body;
    console.log(orderList);

    const response = await CataloguesDAO.updateInventory(orderList);

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // Controller for adding address of user
  static async addAddress(req, res, next) {
    const { userid, street, province, country, zip, phoneNum, creditcard } =
      req.body;

    const response = await AddressDAO.addAddress(
      userid,
      street,
      province,
      country,
      zip,
      phoneNum,
      creditcard
    );

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // Controller method for adding user's order to order collection
  static async addOrder(req, res, next) {
    const { id, totalPrice, orderList } = req.body;
    console.log(orderList);

    const response = await OrdersDAO.addOrders(id, totalPrice, orderList);

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }

  // Controller method to reset cart
  static async resetCart(req, res, next) {
    const { email } = req.body;

    const response = await UsersDAO.resetCart(email);

    if (!response) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
  }
}
