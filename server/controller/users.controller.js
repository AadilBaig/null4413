import UsersDAO from "../dao/usersDao.js";

export default class UsersController {
  // Controller method for finding a user by name
  static async findUserName(req, res, next) {
    const name = req.query.name;
    const response = await UsersDAO.getUserName(name);

    // Unable to find user
    if (!response) {
      res.status(401).json({ error: "Not Found" });
      return;
    }

    res.status(200).json(response);
  }

  // Constroller method for finding a user
  static async findUser(req, res, next) {
    const name = req.query.name;
    const password = req.query.password;

    const response = await UsersDAO.getUser(name, password);

    // Unable to find user
    if (!response) {
      res.status(401).json({ error: "Not Found" });
      return;
    }

    res.status(200).json(response);
  }

  // Controller method for adding a new user
  static async addUser(req, res, next) {
    const { name, password } = req.body;
    const response = await UsersDAO.addUser({
      name,
      password,
    });

    if (!response) {
      res.status(500).json({ error: "Unexpected server error" });
      return;
    }

    res.status(200).json(response);
  }
}
