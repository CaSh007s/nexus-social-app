import mongoose from 'mongoose';
import dotenv from 'dotenv'; dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Exports the database connection function to be used across the application
 * @module connectDB
 * @returns {Function} A function that establishes a connection to MongoDB
 */
export default connectDB;