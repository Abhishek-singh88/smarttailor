import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
console.log("Connecting to:", uri);
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// Fix: Add custom property to global using type assertion
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
