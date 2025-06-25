import mongoose from 'mongoose';
import environment from '../constants/environment.js';

export default function () {
  return mongoose.connect(environment.DB_CONNECTION_STRING);
}
