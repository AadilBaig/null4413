let ordersCollection;
let usersCollection;
let itemsCollection;
let addressCollection;

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
            addressCollection = await conn.db(process.env.DB_NAME).collection("address");
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
            const orders = await ordersCollection.find({ FK_CustomerID: userId }).toArray();
            return orders;
        } catch (error) {
            console.error(
                "Unable to get users orders ",
                error
            );
        }
    }

    static async getUserInfo(userEmail, userId){
        if (!userEmail) {
            console.log("id is empty");
            return false;
        }

        try {
            const addr = await addressCollection.findOne({ userid: userId });
            if (!addr) {
                console.log("Address not found.");
                return false;
            }

            console.log(userEmail);
            const user = await usersCollection.findOne({ email: userEmail });
            if (!user) {
                console.log("User  not found.");
                return false;
            }

            const combinedResult = {
                userId: user._id,
                userEmail: user.email,
                userFirstName: user.firstName, 
                userLastName: user.lastName, 
                addressId: addr._id, 
                addressUserId: addr.userid, 
                addressStreet: addr.street, 
                addressProvince: addr.province, 
                addressCountry: addr.country, 
                addressZip: addr.zip, 
                addressPhoneNum: addr.phoneNum, 
                addressCreditCard: addr.creditcard 
            };

            return combinedResult;
        } catch (error) {
            console.log("Error fetching user address");
            return false;
        }
    }

    static async updateCustomerInfo(userEmail, newInfo){
        try {
            console.log(userEmail); 
            const user = await usersCollection.findOne({ email: userEmail })

            const userId = user._id.toString();
            console.log(userId);

            const addressUpdateResult = await addressCollection.updateOne(
                { userid: userId },
                {
                    $set: {
                        street: newInfo.addressStreet,
                        province: newInfo.addressProvince,
                        country: newInfo.addressCountry,
                        zip: newInfo.addressZip,
                        phoneNum: newInfo.addressPhoneNum,
                        creditcard: newInfo.addressCreditCard,
                    },
                }
            );

            if (addressUpdateResult.matchedCount === 0) {
                console.log(`No address found for userId: ${userId}`);
                return { success: false, message: "Address not found for the user." };
            }
        } catch (error) {
            console.error("Error updating customer info:", error);
            return { success: false, message: "An error occurred while updating customer info." };
        }
    }
}