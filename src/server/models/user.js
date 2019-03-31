import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
});

userSchema.static('findByUsername', function findByUsername(username) {
  return this.find({ username });
});

const User = mongoose.model('User', userSchema);

export default User;
