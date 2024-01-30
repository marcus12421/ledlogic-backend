import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URL).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

export default connectDatabase;
