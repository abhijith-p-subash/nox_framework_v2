import { connect } from "mongoose";
import "dotenv/config";

const mongoConnection = async () => {
  try {
    const mongoURI: string = `${process.env.MONGO_URI}`;
    await connect(mongoURI);
    // console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error);
    // Exit process with failure
    process.exit(1);
  }
};

export default mongoConnection;
