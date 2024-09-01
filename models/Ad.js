
import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  content: String
});

const Ad = mongoose.model('Ad', AdSchema);
export default Ad;

