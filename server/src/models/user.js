import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  name: { type: String, required: false },
  createdDate: { type: Date, default: Date.now }
});

userSchema.static('findByEmail', function findByEmail(email) {
  return this.findOne({ email });
});

const User = mongoose.model('User', userSchema);

export default User;
