let addrCollection;

export default class AddressDAO {
  // Establishes a connection line to a collection in the DB
  static async injectDB(conn) {
    // if there is already a collection handle then do nothing
    if (addrCollection) {
      return;
    }
    try {
      addrCollection = await conn.db(process.env.DB_NAME).collection("address");
    } catch (error) {
      console.error(
        "Unable to establish a collection handle with address: ",
        error
      );
    }
  }

  // method for getting addr of a user
  static async getAddress(id = null) {
    if (!id) {
      console.log("id is empty");
      return false;
    }

    try {
      const addr = await addrCollection.findOne({ userid: id });

      if (!addr) {
        console.log("Address not found.");
        return false;
      }

      return addr;
    } catch (error) {
      console.log("Error fetching user address");
      return false;
    }
  }

  // method for adding user address
  static async addAddress(
    userid = null,
    street = null,
    province = null,
    country = null,
    zip = null,
    phoneNum = null,
    creditcard = null
  ) {
    if (
      !userid ||
      !street ||
      !province ||
      !country ||
      !zip ||
      !phoneNum ||
      !creditcard
    ) {
      console.log("address field is empty");
      return false;
    }

    try {
      // Insert the new address into the collection
      const result = await addrCollection.insertOne({
        userid: userid,
        street: street,
        province: province,
        country: country,
        zip: zip,
        phoneNum: phoneNum,
        creditcard: creditcard,
      });

      if (result.insertedId) {
        console.log("Address added successfully");
        const newAddress = await addrCollection.findOne({
          _id: result.insertedId,
        });
        return newAddress;
      } else {
        console.log("Failed to add address");
        return false;
      }
    } catch (error) {
      console.error("Error adding user address");
      return false;
    }
  }

  // method for updating user's address
  static async updateAddress(
    userid = null,
    street = null,
    province = null,
    country = null,
    zip = null,
    phoneNum = null,
    creditcard = null
  ) {
    if (
      !userid ||
      !street ||
      !province ||
      !country ||
      !zip ||
      !phoneNum ||
      !creditcard
    ) {
      console.log("one of the address field is empty");
      return false;
    }

    try {
      // Update user address
      const updateResult = await addrCollection.updateOne(
        { userid: userid }, // Query to find the document
        {
          $set: {
            street: street,
            province: province,
            country: country,
            zip: zip,
            phoneNum: phoneNum,
            creditcard: creditcard,
          },
        }
      );

      if (updateResult.matchedCount === 0) {
        console.log("Address not found for the given userid.");
        return false;
      }

      console.log("Address updated successfully");
      return true;
    } catch (error) {
      console.log("Error finding user address");
      return false;
    }
  }
}
