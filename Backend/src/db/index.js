import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async() => {
  try {
    const connectionInstance = mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`, {
        
       
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      }
    );

    console.log("Database Connected Sucessfully!");
  } catch (error) {
    console.log("Database Connection Error.", error);
    process.exit(1)
  }
};



// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit process with failure
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1); // Exit process with failure
});

export default connectDB;
