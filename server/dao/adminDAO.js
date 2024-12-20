let ordersCollection;
let usersCollection;
let itemsCollection;

export default class adminDAO {
    static async injectDB(conn) {
        // if there is already a collection handle then do nothing
        if (usersCollection && ordersCollection && itemsCollection) {
            return;
        }
        try {
            usersCollection = await conn.db(process.env.DB_NAME).collection("users");
            ordersCollection = await conn.db(process.env.DB_NAME).collection("orders");
            itemsCollection = await conn.db(process.env.DB_NAME).collection("items");
        } catch (error) {
            console.error(
                "Unable to establish a collection handle with database: ",
                error
            );
        }
    }

    static async getAllOrders(){
        try{
            const orders = await ordersCollection.find({}).toArray(); // Retrieve all orders
            return orders;
        }catch(error){
            console.error(
                "Unable to get orders ",
                error
            );
        }
    }

    static async getAllUsers() {
        try {
            const users = await usersCollection.find({}).toArray(); // Retrieve all orders
            return users;
        } catch (error) {
            console.error(
                "Unable to get users ",
                error
            );
        }
    }

    static async getInventory() {
        try {
            const items = await itemsCollection.find({}).toArray(); // Retrieve all orders
            return items;
        } catch (error) {
            console.error(
                "Unable to get items ",
                error
            );
        }
    }

    static async updateItem(itemId, newQty) {
        try {
            // Retrieve the item by its ID
            const item = await itemsCollection.findOne({ _id: itemId });

            if (!item) {
                throw new Error(`Item with ID ${itemId} not found.`);
            }

            // Update the item's quantity
            const updateResult = await itemsCollection.updateOne(
                { _id: itemId },
                { $set: { 'Item1.quantity': newQty } }
            );

            if (updateResult.modifiedCount === 0) {
                throw new Error(`Failed to update quantity for item with ID ${itemId}.`);
            }

            console.log(`Successfully updated item with ID ${itemId} to quantity ${newQty}.`);
            return true;
        } catch (error) {
            console.error(
                "Unable to update item ",
                error
            );
            return false;
        }
    }

    static async getUsersOrders(userId){
        try {
            const orders = await ordersCollection.find({ userId: userId }).toArray();
            return orders;
        } catch (error) {
            console.error(
                "Unable to get users orders ",
                error
            );
        }
    }
}