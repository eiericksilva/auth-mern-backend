import mongoose from "mongoose";

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DATABASE;

const connectDB = async () => {
  if (!global.mongoose) {
    mongoose.set("strictQuery", false);
    global.mongoose = await mongoose
      .connect(
        `mongodb+srv://${user}:${password}@auth-jwt-cluster.oig3agc.mongodb.net/${database}?retryWrites=true&w=majority`
      )
      .then(() => console.log("MongoDB foi conectado!!!"))
      .catch((error) => console.log("Error no mongoDB Atlas:", error));
  }
};

export default connectDB;
