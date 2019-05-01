import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  hash: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
