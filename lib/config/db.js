import mongoose, { connection } from "mongoose";

const ConnectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;

    console.log("MongoDB connected");
  } catch (error) {
    console.log("error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};

export default ConnectDB;

