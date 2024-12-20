let ordersCollection;

export default class OrdersDAO {
  // Establishes a connection line to a collection in the DB
  static async injectDB(conn) {
    // if there is already a collection handle then do nothing
    if (ordersCollection) {
      return;
    }
    try {
      ordersCollection = await conn
        .db(process.env.DB_NAME)
        .collection("orders");
    } catch (error) {
      console.error(
        "Unable to establish a collection handle with orders: ",
        error
      );
    }
  }

  static async addOrders(id = null, totalPrice = null, orderList = null) {
    if (!id || !totalPrice || !orderList) {
      console.log("either id, price, or orderlist is empty or invalid");
      return false;
    }

    try {
      // Create the order object
      const order = {
        Date: new Date().toLocaleDateString(), // current date in MM/DD/YYYY format
        TotalPrice: totalPrice, // Total price passed in as a parameter
        productName: JSON.stringify(orderList), // The list of goods (products) ordered
        FK_CustomerID: id, // Customer ID (foreign key reference to the customer)
      };

      // Insert the new order into the orders collection
      const result = await ordersCollection.insertOne(order);

      if (result.insertedId) {
        console.log("Order successfully added to the database.");
        return true; // Return true if the order was added successfully
      } else {
        console.log("Failed to add the order.");
        return false; // Return false if the insertion failed
      }
    } catch (error) {
      console.error("Error in posting entry in Order collection");
      return false;
    }
  }
}
