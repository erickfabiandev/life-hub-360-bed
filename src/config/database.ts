import mongoose from 'mongoose';

let connection: mongoose.Connection | null = null

const connect = async () => {
  if (connection) return;

  const MONGO_URI = process.env.DATABASE_URL || ''

  connection = mongoose.connection;

  connection.once('open', () => {
    console.log('Connected to MongoDB');
  });

  connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

  connection.on('error', (error) => {
    console.log('Error connecting to MongoDB', error);
  });

  await mongoose.connect(MONGO_URI);
};

export default connect;

