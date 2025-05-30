import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/project`);
    console.log("DB connected successfully");
    
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
