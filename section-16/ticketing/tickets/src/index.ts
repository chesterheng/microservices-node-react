import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper'

const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect(
      'ticketing', 
      'dhghad', 
      'http://nats-srv:4222'
    );
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();

