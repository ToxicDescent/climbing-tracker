import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
});

userSchema.statics.findByUsername = async username => {
  const user = await this.findOne({
    username
  });

  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
