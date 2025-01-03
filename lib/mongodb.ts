import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

interface GlobalWithMongo {
  mongo: {
    conn: MongoClient | null;
    promise: Promise<MongoClient> | null;
  };
}

// Define the global type
declare global {
  var mongo: {
    conn: MongoClient | null;
    promise: Promise<MongoClient> | null;
  };
}

const globalWithMongo = global as GlobalWithMongo

if (!globalWithMongo.mongo) {
  globalWithMongo.mongo = {
    conn: null,
    promise: null,
  }
}

export async function connectToDatabase() {
  if (globalWithMongo.mongo.conn) {
    return globalWithMongo.mongo.conn.db()
  }

  if (!globalWithMongo.mongo.promise) {
    globalWithMongo.mongo.promise = MongoClient.connect(uri, options)
  }

  try {
    const client = await globalWithMongo.mongo.promise
    globalWithMongo.mongo.conn = client
    return client.db()
  } catch (e) {
    console.error('Failed to connect to database:', e)
    throw e
  }
} 