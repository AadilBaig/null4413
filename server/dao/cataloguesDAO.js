let itemsCollection;

export default class CataloguesDAO {
  // Establishes a connection line to a collection in the DB
  static async injectDB(conn) {
    // if there is already a collection handle then do nothing
    if (itemsCollection) {
      return;
    }
    try {
      itemsCollection = await conn.db(process.env.DB_NAME).collection("items");
    } catch (error) {
      console.error(
        "Unable to establish a collection handle with items: ",
        error
      );
    }
  }

  // method gets all items
  static async getItems() {
    let items;
    let query = {}; // empty query to fetch all documents

    try {
      items = await itemsCollection.find(query).toArray(); // converts cursor to an array
      return items;
    } catch (error) {
      console.error("Error in getting items from database: ", error);
      return null;
    }
  }

  // method to get all cart items
  static async getCartItems(cart = null) {
    if (!cart || cart.length === 0) {
      return [];
    }
    const itemNames = cart.map((item) => item.name); // Get names of items from the cart
    console.log("Cart Item Names:", itemNames);

    try {
      // Query MongoDB to find all documents, since we're looking for the nested "Item1" field
      const items = await itemsCollection.find({}).toArray();

      // Filter and flatten the nested fields (Item1) into an array of items
      const filteredItems = items.flatMap((doc) => {
        // Check if Item1 exists and if its name matches any of the names in the cart
        if (doc.Item1 && itemNames.includes(doc.Item1.name)) {
          return [doc.Item1]; // Return the Item1 object if it's a match
        }
        return []; // Return an empty array if no match
      });

      return filteredItems;
    } catch (error) {
      console.error("Error in getting cart items from database: ", error);
      return null;
    }
  }

  // method to update Inventory
  static async updateInventory(orderList = null) {
    if (!orderList || orderList.length === 0) {
      console.log("Order list is empty or invalid.");
      return false;
    }

    try {
      // Loop through the orderList to update each item's quantity
      for (const orderItem of orderList) {
        const { name, qty } = orderItem;

        if (!name || !qty) {
          console.log(`Invalid order item: ${JSON.stringify(orderItem)}`);
          continue;
        }

        console.log("name:" + name + " qty: " + qty);

        // Find the document containing the item and update its quantity
        const result = await itemsCollection.updateOne(
          { "Item1.name": name },
          { $inc: { "Item1.quantity": -qty } } // Decrease the quantity
        );

        if (result.modifiedCount === 0) {
          console.log(`No items updated for name: ${name}`);
        }
      }

      console.log("Inventory updated successfully");
      return true;
    } catch (error) {
      console.error("Error in trying to update inventory");
      return false;
    }
  }
}
