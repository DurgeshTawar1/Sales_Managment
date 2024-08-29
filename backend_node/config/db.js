import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();




// Connection string for MongoDB
const mongoUri = process.env.MONGO_URL;

if (!mongoUri) {
  console.error('MONGO_URL environment variable is not set.');
  process.exit(1);
}

// Create a connection to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); 
  }
}

export default connectToDatabase;
