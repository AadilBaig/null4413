let usersCollection;

export default class UsersDAO {
  // Establishes a connection line to a collection in the DB
  static async injectDB(conn) {
    // if there is already a collection handle then do nothing
    if (usersCollection) {
      return;
    }
    try {
      usersCollection = await conn.db(process.env.DB_NAME).collection("users");
    } catch (error) {
      console.error(
        "Unable to establish a collection handle with users: ",
        error
      );
    }
  }

  // method finds a specific user by name/email
  static async getUserName(email = null) {
    let user;
    let query = {};

    if (email) {
      query.email = email;
    }

    try {
      // Search for user by email (name)
      user = await usersCollection.findOne(query);

      if (!user) {
        console.log("User name not found.");
        return null;
      }

      return { userName: user.email };
    } catch (error) {
      console.error("Error in finding username in collection: ", err);
      return null;
    }
  }

  // method finds a specific user
  static async getUser(email = null, password = null) {
    let user;
    let query = {};

    if (email) {
      query.email = email;
    }
    if (password) {
      query.password = password;
    }

    try {
      // Search for user by email (name)
      user = await usersCollection.findOne(query);

      if (!user) {
        console.log("User not found.");
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error in finding user in collection: ", err);
      return null;
    }
  }

  // method registers a user to the database
  static async addUser({
    firstName = null,
    lastName = null,
    email = null,
    password = null,
  }) {
    let user;
    let query = {};

    // create user schema
    if (firstName && lastName && email && password) {
      query.firstName = firstName;
      query.lastName = lastName;
      query.email = email;
      query.password = password;
      (query.cart = []),
        (query.creditCard = ""),
        (query.shipAddr = ""),
        (query.role = "Customer");
    }

    try {
      user = await usersCollection.insertOne(query);

      if (!user) {
        console.log("Failed to add user");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error inserting user to collection: ", error);
      return false;
    }
  }

  // method for adding item to user's cart
  static async addItemToCart(email = null, item = null) {
    if (!email || !item) {
      console.log("Email or item is missing");
      return false;
    }

    try {
      // Find user by email and push item to the Items array
      const result = await usersCollection.updateOne(
        { email: email },
        { $addToSet: { cart: item } }
      );

      if (result.modifiedCount === 0) {
        console.log("No user found or item already exists in the cart.");
        return false;
      }

      console.log("Item inserted to cart.");
      return true;
    } catch (error) {
      console.error("Error adding item to cart: ", error);
      return false;
    }
  }
}
