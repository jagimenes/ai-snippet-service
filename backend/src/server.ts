import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

async function start() {
  await mongoose.connect(config.mongo.uri);
  app.listen(config.server.port, () => console.log('Server is running 🚀'));
}

start().catch(
  console.error
);