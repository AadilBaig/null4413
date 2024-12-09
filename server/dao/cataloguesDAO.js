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
}
