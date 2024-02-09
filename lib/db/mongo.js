require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

const connection = async () => {
  try {
    if (!mongoUri) {
      throw new Error("connection failed to Mongo, mongoUri is not set");
    }
    await mongoose.connect(mongoUri);
    console.log("server is connected to MongoDb");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connection;
