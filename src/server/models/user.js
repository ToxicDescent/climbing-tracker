import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: {
    first: {
      type: String
    },
    last: {
      type: String
    }
  }
});

userSchema.static('findByUsername', function findByUsername(username) {
  return this.findOne({ username });
});

const User = mongoose.model('User', userSchema);

export default User;
