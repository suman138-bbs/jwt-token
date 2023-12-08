import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
async function connect() {
  // const mongod = await MongoMemoryServer.create();
  const getUri = process.env.MONGODB_URL;

  const db = await mongoose.connect(getUri);
  //   console.log(db);
  return db;
}

export default connect;
