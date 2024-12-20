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
    cart = null,
  }) {
    let user;
    let query = {};

    // create user schema
    if (firstName && lastName && email && password) {
      query.firstName = firstName;
      query.lastName = lastName;
      query.email = email;
      query.password = password;
      (query.cart = cart ? cart : []),
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

      console.log("User created successfully.");

      return true;
    } catch (error) {
      console.error("Error inserting user to collection: ", error);
      return false;
    }
  }

  // method for adding item to user's cart
  static async addItemToCart(email = null, itemName = null, qty = null) {
    console.log("email " + email + "item " + itemName + "qty " + qty);
    if (!email || !itemName || !qty) {
      console.log("Email, item, or quantity is missing");
      return false;
    }

    try {
      const cartItem = {
        name: itemName,
        qty: qty,
      };
      // Find user by email and push item to the Items array
      const result = await usersCollection.updateOne(
        { email: email },
        { $addToSet: { cart: cartItem } }
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

  // method for updating user's cart
  static async updateCart(email = null, cart = null) {
    if (!cart || !email) {
      console.log("Cart is empty or email doesn't exists.");
      return false;
    }
    try {
      // Update user's cart with new one
      const result = await usersCollection.updateOne(
        { email: email },
        { $set: { cart: cart } }
      );

      // Check if the user's cart was updated
      if (result.modifiedCount === 0) {
        console.log("No user found or cart update failed");
        return false;
      }

      console.log("User's cart successfully updated.");
      return true;
    } catch (error) {
      console.error("Error updating user's cart.", error);
      return false;
    }
  }

  // method for getting user ID
  static async getID(email = null) {
    if (!email) {
      console.log("Email is required");
      return null;
    }

    try {
      // Find user by email
      const user = await usersCollection.findOne({ email: email });

      // Check if the user exists
      if (!user) {
        console.log("User not found.");
        return null;
      }

      return user._id;
    } catch (error) {
      console.error("Error finding user ID ", error);
      return false;
    }
  }

  // method to reset user cart
  static async resetCart(email = null) {
    if (!email) {
      console.log("email doesn't exist or invalid");
      return;
    }

    try {
      // Reset the cart by setting it to an empty array
      const result = await usersCollection.updateOne(
        { email: email },
        { $set: { cart: [] } } // Set the cart to an empty array
      );

      // Check if the cart was successfully reset
      if (result.modifiedCount === 0) {
        console.log("No user found or cart reset failed.");
        return false;
      }

      console.log("User's cart has been reset");
      return true;
    } catch (error) {
      console.error("Error in trying to reset cart");
      return false;
    }
  }
}
