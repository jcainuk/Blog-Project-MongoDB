// Require the mongodb package
const mongodb = require('mongodb');

const {
  MONGODB_URI, DB_NAME,
} = process.env;

// The actual thing that establishes the database connection
const { MongoClient } = mongodb;

let database;

// Make the connection with credentials
const connect = async () => {
  const client = await MongoClient.connect(MONGODB_URI);
  database = client.db(DB_NAME);
};

const getDb = () => {
  if (!database) {
    throw { message: 'Database connection not established!' };
  }
  return database;
};

module.exports = {
  connectToDatabase: connect,
  getDB: getDb,
};
