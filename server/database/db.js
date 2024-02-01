import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      dbName: "whatsApp--clone",
    });
    console.log(`Database connected successfully...`);
  } catch (error) {
    console.log(`Error while connecting with database ${error.message} `);
  }
};

export default databaseConnection;
