import mongoose from "mongoose";

const connectDatabase = async () => {

  try {
    // const data = await mongoose.connect('mongodb://webtimes:webtimes12421@ac-rz6t1zf-shard-00-00.uslcrjf.mongodb.net:27017,ac-rz6t1zf-shard-00-01.uslcrjf.mongodb.net:27017,ac-rz6t1zf-shard-00-02.uslcrjf.mongodb.net:27017/?ssl=true&replicaSet=atlas-ghfr0n-shard-0&authSource=admin&retryWrites=true&w=majority&appName=discount-shipping');

    const data = await mongoose.connect('mongodb://webtimes:webtimes12421@ac-rz6t1zf-shard-00-00.uslcrjf.mongodb.net:27017,ac-rz6t1zf-shard-00-01.uslcrjf.mongodb.net:27017,ac-rz6t1zf-shard-00-02.uslcrjf.mongodb.net:27017/?replicaSet=atlas-ghfr0n-shard-0&ssl=true&authSource=admin');

    console.log(`Mongodb connected with server: ${data.connection.host}`);
  } catch (error) {
    console.log("Error>>>:", error);
  }
};

export default connectDatabase;


// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://webtimes:webtimes12421@discount-shipping.uslcrjf.mongodb.net/?retryWrites=true&w=majority&appName=discount-shipping";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectDatabase() {
//   try {
//     await client.connect();

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error) {
//     console.log("Error: >>> ", error)
//   } finally {
//     await client.close();
//   }
// }

// export default connectDatabase
