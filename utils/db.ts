import mongoose from "mongoose";
import type { ConnectionStates } from "mongoose";

const connection: { isConnected?: ConnectionStates } = {};
const options = {
  autoIndex: true,
};

async function connect() {
  if (connection.isConnected) {
    console.log("alreay connected!");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.MONGODB_URI || "", options);
  console.log("new connection!");
  //   console.log(db.connections[0]);
  connection.isConnected = (await db).connections[0].readyState;
}

async function disconnect() {
  if (process.env.NODE_ENV === "production") {
    await mongoose.disconnect();
    connection.isConnected = 0;
    return;
  }
  console.log("not disconnected");
}

function convertDocToObj(doc) {
  if (doc?._id) doc._id = doc._id.toString();
  if (doc?.createdAt) doc.createdAt = doc.createdAt.toString();
  if (doc?.updatedAt) doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
