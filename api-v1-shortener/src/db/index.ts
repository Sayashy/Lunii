import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const DB_HOST = process.env.DB_HOST;

if (!DB_HOST) throw 'Please provide a MongoDB URL';

const connect = () =>
  mongoose.connect(DB_HOST, {}, () => {
    console.log('Database connection has been established successfully.');
  });

const makeIdFromString = (id: string) => new mongoose.Types.ObjectId(id);

const database = {
  connect,
  makeIdFromString
};

export default database;
