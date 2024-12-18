import UsersDAO from "../dao/usersDao.js";

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
    const { firstName, lastName, email, password } = req.body;
    const response = await UsersDAO.addUser({
      firstName,
      lastName,
      email,
      password,
    });

    if (!response) {
      res.status(500).json({ error: "Unexpected server error" });
      return;
    }

    res.status(200).json(response);
  }

  // Controller method for add item to user's cart
  static async addItemToCart(req, res, next) {
    const { email, item } = req.body;
    const response = await UsersDAO.addItemToCart(email, item);

    if (!response) {
      res.status(500).json({ error: "Unexpected server error" });
      return;
    }
    res.status(200).json(response);
  }
}
