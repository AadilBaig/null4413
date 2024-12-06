import UsersDAO from "../dao/usersDao.js";

export default class UsersController {
  // Controller method for finding a user
  static async findUser(req, res, next) {
    const { name, password } = req.body;
    const response = await UsersDAO.getUser({
      name,
      password,
    });

    // Unable to find user
    if (!response) {
      res.status(404).json({ error: "Not Found" });
      return;
    }

    res.status(200).json(response);
  }

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
