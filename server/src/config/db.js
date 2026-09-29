import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the provided URI in environment variables.
 * Designed to be reusable and handle connection errors gracefully.
 */
const connectDB = async () => {
  try {
    // OLD CODE: previous implementation preserved for project history.
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    // REASON FOR CHANGE: Matching explicit environment variable MONGODB_URI required by project owner.
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
